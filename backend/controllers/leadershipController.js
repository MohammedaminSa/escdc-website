import Leadership from '../models/LeadershipModel.js';
import { leadershipUpload, cloudinary } from '../config/cloudinary.js';

// Get all leadership members (public)
export const getAllLeadership = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }
    
    const leadership = await Leadership.find(query)
      .sort({ category: 1, order: 1, createdAt: 1 })
      .populate('createdBy', 'username');
    
    res.json({
      success: true,
      count: leadership.length,
      leadership
    });
    
  } catch (error) {
    console.error('Get leadership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leadership'
    });
  }
};

// Get leadership by category (public)
export const getLeadershipByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const leadership = await Leadership.find({ 
      category, 
      isActive: true 
    })
    .sort({ order: 1, createdAt: 1 })
    .populate('createdBy', 'username');
    
    res.json({
      success: true,
      count: leadership.length,
      leadership
    });
    
  } catch (error) {
    console.error('Get leadership by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leadership by category'
    });
  }
};

// Create new leadership member (admin only)
export const createLeadership = async (req, res) => {
  try {
    const {
      name,
      position,
      category,
      sector,
      bio,
      email,
      phone,
      socialMedia,
      order
    } = req.body;
    
    // Validate required fields
    if (!name || !position || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, position, and category are required'
      });
    }
    
    // Validate sector for executive-sector category
    if (category === 'executive-sector' && !sector) {
      return res.status(400).json({
        success: false,
        message: 'Sector is required for executive sector members'
      });
    }
    
    const leadership = new Leadership({
      name,
      position,
      category,
      sector: category === 'executive-sector' ? sector : undefined,
      bio: bio || '',
      email: email || '',
      phone: phone || '',
      socialMedia: socialMedia || {},
      order: order || 0,
      createdBy: req.admin._id
    });
    
    await leadership.save();
    
    // Populate the createdBy field for response
    await leadership.populate('createdBy', 'username');
    
    res.status(201).json({
      success: true,
      message: 'Leadership member created successfully',
      leadership
    });
    
  } catch (error) {
    console.error('Create leadership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create leadership member'
    });
  }
};

// Update leadership member (admin only)
export const updateLeadership = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Clean up the data before validation
    if (updateData.category === 'higher-management') {
      // Remove sector field for higher-management members
      delete updateData.sector;
    } else if (updateData.category === 'executive-sector' && !updateData.sector) {
      return res.status(400).json({
        success: false,
        message: 'Sector is required for executive sector members'
      });
    }
    
    // Remove empty string values that might cause enum validation issues
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === '') {
        if (key === 'sector' || key === 'bio' || key === 'email' || key === 'phone') {
          delete updateData[key];
        }
      }
    });
    
    const leadership = await Leadership.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');
    
    if (!leadership) {
      return res.status(404).json({
        success: false,
        message: 'Leadership member not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Leadership member updated successfully',
      leadership
    });
    
  } catch (error) {
    console.error('Update leadership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update leadership member'
    });
  }
};

// Delete leadership member (admin only)
export const deleteLeadership = async (req, res) => {
  try {
    const { id } = req.params;
    
    const leadership = await Leadership.findById(id);
    
    if (!leadership) {
      return res.status(404).json({
        success: false,
        message: 'Leadership member not found'
      });
    }
    
    // Delete associated image file if exists
    if (leadership.image && leadership.image.startsWith('/uploads/')) {
      const imagePath = path.join(process.cwd(), leadership.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Leadership.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Leadership member deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete leadership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete leadership member'
    });
  }
};

// Get single leadership member (public)
export const getLeadershipById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const leadership = await Leadership.findById(id)
      .populate('createdBy', 'username');
    
    if (!leadership) {
      return res.status(404).json({
        success: false,
        message: 'Leadership member not found'
      });
    }
    
    res.json({
      success: true,
      leadership
    });
    
  } catch (error) {
    console.error('Get leadership by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leadership member'
    });
  }
};

// Get admin leadership (all members for admin management)
export const getAdminLeadership = async (req, res) => {
  try {
    const leadership = await Leadership.find()
      .sort({ category: 1, order: 1, createdAt: -1 })
      .populate('createdBy', 'username');
    
    res.json({
      success: true,
      count: leadership.length,
      leadership
    });
    
  } catch (error) {
    console.error('Get admin leadership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin leadership'
    });
  }
};

// Upload leadership image (admin only)
export const uploadLeadershipImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }
    
    const leadership = await Leadership.findById(id);
    
    if (!leadership) {
      return res.status(404).json({
        success: false,
        message: 'Leadership member not found'
      });
    }
    
    // Delete old image if exists
    if (leadership.image && leadership.image.startsWith('/uploads/')) {
      const oldImagePath = path.join(process.cwd(), leadership.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    // Update with new image path
    const imagePath = `/uploads/leadership/${req.file.filename}`;
    leadership.image = imagePath;
    await leadership.save();
    
    await leadership.populate('createdBy', 'username');
    
    res.json({
      success: true,
      message: 'Leadership image uploaded successfully',
      leadership
    });
    
  } catch (error) {
    console.error('Upload leadership image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload leadership image'
    });
  }
};