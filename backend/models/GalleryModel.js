import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  mimeType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // For videos - duration in seconds
    default: null
  },
  thumbnail: {
    type: String, // For videos - thumbnail image path
    default: null
  },
  category: {
    type: String,
    enum: ['workshops', 'lectures', 'competitions', 'networking', 'team', 'community'],
    default: 'workshops'
  },
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  eventDate: {
    type: Date
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Gallery', gallerySchema);