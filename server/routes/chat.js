import express from 'express';
import { handleCupidChat } from '../services/aiService.js';
import { Inquiry } from '../models/Inquiry.js';
import { ChatMessage } from '../models/ChatMessage.js';
import { fallbackStore, isMongoConnected } from '../config/db.js';
import { sendLeadNotificationEmail } from '../services/emailService.js';

const router = express.Router();

// POST /api/chat - Talk to Cupid AI Virtual Assistant
router.post('/', async (req, res) => {
  try {
    const { message, sessionId = 'guest_' + Date.now(), history = [], clientInfo = null } = req.body;

    if (!message && (!clientInfo || !clientInfo.email)) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Call Cupid AI logic (Gemini or heuristic fallback)
    const result = await handleCupidChat({ message, history, clientInfo });

    let savedLead = null;

    // If clientInfo contains email and name, automatically create a lead & send email notification!
    if (clientInfo && clientInfo.name && clientInfo.email) {
      const inquiryPayload = {
        name: clientInfo.name.trim(),
        email: clientInfo.email.trim().toLowerCase(),
        project: clientInfo.project || message || 'Cupid AI Direct Consultation',
        budget: clientInfo.budget || 'Flexible',
        service: 'Cupid AI Lead',
        message: message || `User chatted via Cupid AI: ${clientInfo.project || 'Inquiry'}`,
        source: 'cupid_ai',
        status: 'pending'
      };

      if (isMongoConnected) {
        const doc = new Inquiry(inquiryPayload);
        savedLead = await doc.save();
      } else {
        savedLead = fallbackStore.createInquiry(inquiryPayload);
      }

      // Dispatch Nodemailer email notification
      sendLeadNotificationEmail(savedLead).catch(err => {
        console.error('Failed to dispatch notification email:', err.message);
      });
    }

    // Log chat message to database
    if (isMongoConnected && sessionId) {
      try {
        await ChatMessage.create({
          sessionId,
          sender: 'user',
          text: message || '[Submitted Contact Details]',
          metadata: { clientInfo }
        });
        await ChatMessage.create({
          sessionId,
          sender: 'cupid_ai',
          text: result.reply,
          metadata: { handoffCompleted: result.handoffCompleted }
        });
      } catch (logErr) {
        // Logging error shouldn't fail response
      }
    }

    return res.json({
      success: true,
      reply: result.reply,
      handoffCompleted: result.handoffCompleted || false,
      needsContactInfo: result.needsContactInfo || false,
      leadCreated: !!savedLead,
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      success: false,
      reply: "Oops! Cupid AI encountered a momentary glitch. You can email Sneha directly at snehasinha0905@gmail.com ❤️",
    });
  }
});

export default router;

