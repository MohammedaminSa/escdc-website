import Resource from '../models/ResourceModel.js';
import path from 'path';
import fs from 'fs';

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
export const getAllResources = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    
    const resources = await Resource.find(query).sort({ uploadedAt: -1 });

    res.json({
      success: true,
      resources
    });
  } catch (error) {
    console.error('Resources fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resources'
    });
  }
};

// @desc    Upload resource
// @route   POST /api/resources/upload
// @access  Private (admin only - add auth later)
export const uploadResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided'
      });
    }

    const { category, title, description } = req.body;

    if (!category || !title) {
      return res.status(400).json({
        success: false,
        message: 'Category and title are required'
      });
    }

    // Save to database
    const resource = new Resource({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: `/uploads/resources/${req.file.filename}`,
      category,
      title,
      description,
      fileType: path.extname(req.file.originalname),
      fileSize: req.file.size
    });

    await resource.save();

    res.json({
      success: true,
      message: 'Resource uploaded successfully',
      resource
    });
  } catch (error) {
    console.error('Resource upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload resource'
    });
  }
};

// @desc    Download resource
// @route   GET /api/resources/download/:id
// @access  Public
export const downloadResource = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resource = await Resource.findById(id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    const uploadDir = 'uploads/resources';
    const filePath = path.join(uploadDir, resource.filename);

    if (fs.existsSync(filePath)) {
      // Increment download count
      resource.downloads += 1;
      await resource.save();

      res.download(filePath, resource.originalName);
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  } catch (error) {
    console.error('Resource download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download resource'
    });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private (admin only - add auth later)
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resource = await Resource.findById(id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Delete file from filesystem
    const uploadDir = 'uploads/resources';
    const filePath = path.join(uploadDir, resource.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Resource.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    console.error('Resource delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resource'
    });
  }
};

// @desc    Get admin resources (all for admin management)
// @route   GET /api/resources/admin/all
// @access  Private (admin only)
export const getAdminResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });

    const stats = {
      total: resources.length,
      career: resources.filter(r => r.category === 'career').length,
      entrepreneurship: resources.filter(r => r.category === 'entrepreneurship').length,
      leadership: resources.filter(r => r.category === 'leadership').length,
      opportunities: resources.filter(r => r.category === 'opportunities').length,
      totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0)
    };

    res.json({
      success: true,
      count: resources.length,
      resources,
      stats
    });
  } catch (error) {
    console.error('Get admin resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin resources'
    });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private (admin only)
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title, description } = req.body;

    const updateData = {
      category,
      title,
      description
    };

    const resource = await Resource.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.json({
      success: true,
      message: 'Resource updated successfully',
      resource
    });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update resource'
    });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resource = await Resource.findById(id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }
    
    res.json({
      success: true,
      resource
    });
  } catch (error) {
    console.error('Get resource by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource'
    });
  }
};
