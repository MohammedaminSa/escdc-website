import Event from '../models/EventModel.js';
import path from 'path';
import fs from 'fs';

// Get all events (public)
export const getAllEvents = async (req, res) => {
  try {
    const { category, status, limit } = req.query;
    
    let query = {};
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }
    
    // Filter by status if provided, default to published for public access
    query.status = status || 'published';
    
    let eventsQuery = Event.find(query)
      .sort({ date: category === 'recent' ? -1 : 1 })
      .populate('createdBy', 'username');
    
    // Apply limit if provided
    if (limit) {
      eventsQuery = eventsQuery.limit(parseInt(limit));
    }
    
    const events = await eventsQuery;
    
    res.json({
      success: true,
      count: events.length,
      events
    });
    
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
};

// Get upcoming events (public)
export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() },
      status: 'published'
    })
    .sort({ date: 1 })
    .limit(10)
    .populate('createdBy', 'username');
    
    res.json({
      success: true,
      count: events.length,
      events
    });
    
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming events'
    });
  }
};

// Get recent events (public)
export const getRecentEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $lt: new Date() },
      status: 'published'
    })
    .sort({ date: -1 })
    .limit(10)
    .populate('createdBy', 'username');
    
    res.json({
      success: true,
      count: events.length,
      events
    });
    
  } catch (error) {
    console.error('Get recent events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent events'
    });
  }
};

// Create new event (admin only)
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      type,
      icon,
      location,
      registrationRequired,
      maxParticipants,
      organizer
    } = req.body;
    
    // Validate required fields
    if (!title || !description || !date || !type) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, date, and type are required'
      });
    }
    
    // Determine category based on date
    const eventDate = new Date(date);
    const now = new Date();
    const category = eventDate > now ? 'upcoming' : 'recent';
    
    const event = new Event({
      title,
      description,
      date: eventDate,
      category,
      type,
      icon: icon || '🎓',
      location: location || 'Haramaya University',
      registrationRequired: registrationRequired || false,
      maxParticipants: maxParticipants || null,
      organizer: organizer || 'ESCDC Team',
      createdBy: req.admin._id
    });
    
    await event.save();
    
    // Populate the createdBy field for response
    await event.populate('createdBy', 'username');
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
    
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event'
    });
  }
};

// Update event (admin only)
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If date is being updated, recalculate category
    if (updateData.date) {
      const eventDate = new Date(updateData.date);
      const now = new Date();
      updateData.category = eventDate > now ? 'upcoming' : 'recent';
    }
    
    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      event
    });
    
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update event'
    });
  }
};

// Delete event (admin only)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event'
    });
  }
};

// Get single event (public)
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id)
      .populate('createdBy', 'username');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      event
    });
    
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
};

// Get admin events (all events for admin management)
export const getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username');
    
    res.json({
      success: true,
      count: events.length,
      events
    });
    
  } catch (error) {
    console.error('Get admin events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin events'
    });
  }
};

// Upload media to event (admin only)
export const uploadEventMedia = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No media file provided'
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Determine media type based on MIME type
    const isVideo = req.file.mimetype.startsWith('video/');
    const mediaType = isVideo ? 'video' : 'image';

    // Validate file size (50MB for videos, 5MB for images)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size is ${isVideo ? '50MB' : '5MB'}`
      });
    }

    // Create media object
    const mediaItem = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: `/uploads/events/${req.file.filename}`,
      mediaType,
      mimeType: req.file.mimetype,
      fileSize: req.file.size
    };

    // Add media to event
    event.media.push(mediaItem);
    await event.save();

    // Fetch the updated event to verify media was saved
    const updatedEvent = await Event.findById(id);

    res.json({
      success: true,
      message: `${mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully`,
      media: mediaItem,
      event: updatedEvent
    });

  } catch (error) {
    console.error('Upload event media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload media'
    });
  }
};

// Delete media from event (admin only)
export const deleteEventMedia = async (req, res) => {
  try {
    const { id, mediaId } = req.params;
    
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Find media item
    const mediaItem = event.media.id(mediaId);
    if (!mediaItem) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Delete file from filesystem
    const uploadDir = 'uploads/events';
    const filePath = path.join(uploadDir, mediaItem.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove media from event
    event.media.pull(mediaId);
    await event.save();

    res.json({
      success: true,
      message: 'Media deleted successfully'
    });

  } catch (error) {
    console.error('Delete event media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media'
    });
  }
};