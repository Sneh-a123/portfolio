import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback in-memory / local JSON store when MongoDB is not running locally
class FallbackStore {
  constructor() {
    this.inquiries = [];
    this.chats = [];
    this.storagePath = path.join(__dirname, '../data_fallback.json');
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.storagePath)) {
        const data = JSON.parse(fs.readFileSync(this.storagePath, 'utf8'));
        this.inquiries = data.inquiries || [];
        this.chats = data.chats || [];
      }
    } catch (e) {
      this.inquiries = [];
      this.chats = [];
    }
  }

  save() {
    try {
      fs.writeFileSync(this.storagePath, JSON.stringify({
        inquiries: this.inquiries,
        chats: this.chats
      }, null, 2));
    } catch (e) {
      console.error('Error writing fallback store:', e.message);
    }
  }

  createInquiry(doc) {
    const item = {
      _id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      status: 'pending',
      createdAt: new Date(),
      ...doc
    };
    this.inquiries.unshift(item);
    this.save();
    return item;
  }

  getInquiries() {
    return [...this.inquiries];
  }

  updateInquiryStatus(id, status) {
    const item = this.inquiries.find(i => i._id === id);
    if (item) {
      item.status = status;
      this.save();
    }
    return item;
  }

  deleteInquiry(id) {
    this.inquiries = this.inquiries.filter(i => i._id !== id);
    this.save();
    return true;
  }
}

export const fallbackStore = new FallbackStore();
export let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sneha_portfolio';
  try {
    mongoose.set('strictQuery', false);
    // Connect with a short timeout so fallback kicks in quickly if Mongo is offline
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log('⚡ [MongoDB] Successfully connected to database');
  } catch (error) {
    isMongoConnected = false;
    console.warn(`⚠️ [MongoDB] Local connection not reachable (${error.message}).`);
    console.log('❤️  [Fallback Storage] Seamlessly activated local fallback storage for Inquiries & Cupid AI leads.');
  }
};

