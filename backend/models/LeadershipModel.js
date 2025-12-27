import mongoose from 'mongoose';

const leadershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['higher-management', 'executive-sector'],
    required: true
  },
  sector: {
    type: String,
    required: function() {
      return this.category === 'executive-sector';
    },
    enum: [
      'networking-professional',
      'innovation-technology', 
      'event-planning',
      'student-career',
      'public-relations'
    ]
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  image: {
    type: String, // URL or file path
    default: null
  },
  socialMedia: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
leadershipSchema.index({ category: 1, order: 1 });
leadershipSchema.index({ isActive: 1 });

// Virtual for full name with position
leadershipSchema.virtual('displayName').get(function() {
  return `${this.name} - ${this.position}`;
});

export default mongoose.model('Leadership', leadershipSchema);