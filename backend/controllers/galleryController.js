import Gallery from '../models/GalleryModel.js';
import { galleryUpload, cloudinary } from '../config/cloudinary.js';

// @desc    Get all gallery media
// @route   GET /api/gallery
// @access  Public
export const getAllGalleryImages = async (req, res) => {
  try {
    const { category, mediaType } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (mediaType) query.mediaType = mediaType;
    
    const media = await Gallery.find(query).sort({ uploadedAt: -1 });

    res.json({
      success: true,
      media,
      images: media // Keep backward compatibility
    });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery media'
    });
  }
};

// @desc    Upload gallery media (image or video)
// @route   POST /api/gallery/upload
// @access  Private (admin only - add auth later)
export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No media file provided'
      });
    }

    const { category, title, description, eventDate } = req.body;

    // Determine media type based on MIME type
    const isVideo = req.file.mimetype.startsWith('video/');
    const mediaType = isVideo ? 'video' : 'image';

    // Save to database with Cloudinary URL
    const galleryMedia = new Gallery({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: req.file.path, // Cloudinary URL
      mediaType,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      category: category || 'workshops',
      title,
      description,
      eventDate: eventDate ? new Date(eventDate) : undefined
    });

    await galleryMedia.save();

    res.json({
      success: true,
      message: `${mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully`,
      media: galleryMedia
    });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload media'
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (admin only - add auth later)
export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const image = await Gallery.findById(id);
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Delete file from Cloudinary
    if (image.filename) {
      try {
        await cloudinary.uploader.destroy(`escdc/gallery/${image.filename}`);
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
      }
    }

    // Delete from database
    await Gallery.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Image delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image'
    });
  }
};

// @desc    Get admin gallery media (all for admin management)
// @route   GET /api/gallery/admin/all
// @access  Private (admin only)
export const getAdminGalleryImages = async (req, res) => {
  try {
    const media = await Gallery.find().sort({ uploadedAt: -1 });

    const stats = {
      total: media.length,
      images: media.filter(item => item.mediaType === 'image').length,
      videos: media.filter(item => item.mediaType === 'video').length,
      workshops: media.filter(item => item.category === 'workshops').length,
      lectures: media.filter(item => item.category === 'lectures').length,
      competitions: media.filter(item => item.category === 'competitions').length,
      networking: media.filter(item => item.category === 'networking').length,
      team: media.filter(item => item.category === 'team').length,
      community: media.filter(item => item.category === 'community').length
    };

    res.json({
      success: true,
      count: media.length,
      media,
      images: media, // Keep backward compatibility
      stats
    });
  } catch (error) {
    console.error('Get admin gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin gallery media'
    });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private (admin only)
export const updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title, description, eventDate } = req.body;

    const updateData = {
      category,
      title,
      description
    };

    if (eventDate) {
      updateData.eventDate = new Date(eventDate);
    }

    const image = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.json({
      success: true,
      message: 'Image updated successfully',
      image
    });
  } catch (error) {
    console.error('Update gallery image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update image'
    });
  }
};

// @desc    Get single gallery image
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryImageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const image = await Gallery.findById(id);
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    res.json({
      success: true,
      image
    });
  } catch (error) {
    console.error('Get gallery image by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch image'
    });
  }
};
