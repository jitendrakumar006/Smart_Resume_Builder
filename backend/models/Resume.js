/**
 * Resume Model
 * Defines the schema for storing resume data
 */

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeName: {
    type: String,
    default: 'My Resume',
  },
  template: {
    type: String,
    enum: ['modern', 'professional', 'simple'],
    default: 'professional',
  },
  personalDetails: {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    profileSummary: {
      type: String,
      required: false,
    },
  },
  education: [
    {
      degree: String,
      institution: String,
      field: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  skills: [
    {
      category: String,
      items: [String],
    },
  ],
  experience: [
    {
      jobTitle: String,
      company: String,
      startDate: String,
      endDate: String,
      currentlyWorking: Boolean,
      description: String,
    },
  ],
  projects: [
    {
      projectName: String,
      description: String,
      technologies: [String],
      link: String,
      startDate: String,
      endDate: String,
    },
  ],
  certifications: [
    {
      certificationName: String,
      issuer: String,
      issueDate: String,
      expiryDate: String,
      credentialId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', resumeSchema);
