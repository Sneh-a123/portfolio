import express from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { fallbackStore, isMongoConnected } from '../config/db.js';
import { sendLeadNotificationEmail } from '../services/emailService.js';
import { verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/inquiries - Submit an inquiry (from Contact form, Terminal, or Direct)
router.post('/', async (req, res) => {
  try {
    const { name, email, project, budget, service, message, source = 'contact_form' } = req.body;

    if (!name || !email || (!project && !message)) {
      return res.status(400).json({
        success: false,
        message: 'Name, Email and Project details are required.'
      });
    }

    const inquiryPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      project: project || message,
      budget: budget || 'Flexible',
      service: service || 'Full Stack Development',
      message: message || project,
      source,
      status: 'pending',
    };

    let savedInquiry;
    if (isMongoConnected) {
      const doc = new Inquiry(inquiryPayload);
      savedInquiry = await doc.save();
    } else {
      savedInquiry = fallbackStore.createInquiry(inquiryPayload);
    }

    // Trigger Nodemailer notification to Sneha
    sendLeadNotificationEmail(savedInquiry).catch(err => {
      console.error('Email dispatch error:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Thank you! Your inquiry has been delivered directly to Sneha. A real human reply is on the way! ❤️",
      inquiry: savedInquiry,
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process inquiry. Please try again or reach out via email.',
    });
  }
});

// GET /api/inquiries - Retrieve all inquiries (Admin protected)
router.get('/', verifyAdminToken, async (req, res) => {
  try {
    let inquiries;
    if (isMongoConnected) {
      inquiries = await Inquiry.find().sort({ createdAt: -1 });
    } else {
      inquiries = fallbackStore.getInquiries();
    }
    return res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/inquiries/:id/status - Update lead status (Admin protected)
router.patch('/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    let updated;
    if (isMongoConnected) {
      updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      updated = fallbackStore.updateInquiryStatus(id, status);
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.json({ success: true, message: 'Status updated', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/inquiries/:id - Delete lead (Admin protected)
router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Inquiry.findByIdAndDelete(id);
    } else {
      fallbackStore.deleteInquiry(id);
    }
    return res.json({ success: true, message: 'Inquiry removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

