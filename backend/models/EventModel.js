import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ['upcoming', 'recent'],
    default: 'upcoming'
  },
  type: {
    type: String,
    enum: ['workshop', 'seminar', 'competition', 'lecture', 'networking', 'training'],
    required: true
  },
  icon: {
    type: String,
    default: '🎓'
  },
  location: {
    type: String,
    default: 'Haramaya University'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'completed', 'cancelled'],
    default: 'published'
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  maxParticipants: {
    type: Number,
    default: null
  },
  organizer: {
    type: String,
    default: 'ESCDC Team'
  },
  media: [{
    filename: String,
    originalName: String,
    url: String,
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    mimeType: String,
    fileSize: Number,
    duration: Number, // For videos
    thumbnail: String, // For videos
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
eventSchema.index({ date: -1, status: 1 });
eventSchema.index({ category: 1, status: 1 });

// Virtual for formatted date
eventSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to check if event is upcoming
eventSchema.methods.isUpcoming = function() {
  return this.date > new Date() && this.status === 'published';
};

// Method to check if event is past
eventSchema.methods.isPast = function() {
  return this.date < new Date();
};

export default mongoose.model('Event', eventSchema);