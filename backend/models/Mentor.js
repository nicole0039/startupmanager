const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  expertise: {
    type: String,
    required: [true, 'Expertise is required'],
    trim: true
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  },
  assignedStartups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);