import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Client email is required'],
    trim: true,
    lowercase: true,
  },
  project: {
    type: String,
    required: [true, 'Project requirements are required'],
  },
  budget: {
    type: String,
    default: 'Flexible / Not Specified',
  },
  service: {
    type: String,
    default: 'Custom Development',
  },
  message: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    enum: ['cupid_ai', 'contact_form', 'terminal', 'direct'],
    default: 'contact_form',
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted', 'archived'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Inquiry = mongoose.model('Inquiry', inquirySchema);

