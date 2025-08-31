const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  founderName: {
    type: String,
    required: [true, 'Founder name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  stage: {
    type: String,
    enum: ['idea', 'prototype', 'seed', 'growth'],
    required: [true, 'Stage is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submissionDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);