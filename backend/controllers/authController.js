import jwt from 'jsonwebtoken';
import Admin from '../models/AdminModel.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'escdc-secret-key', {
    expiresIn: '24h'
  });
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { username: username },
        { email: username }
      ],
      isActive: true
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Verify Token
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'escdc-secret-key');
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Create Initial Admin (for setup)
export const createInitialAdmin = async (req, res) => {
  try {
    // Check if any admin exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Create admin
    const admin = new Admin({
      username,
      email,
      password,
      role: 'admin'
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Initial admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Create admin error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating admin'
    });
  }
};

// Get All Admins (for admin management)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .select('-password')
      .sort({ createdAt: -1 });

    const stats = {
      total: admins.length,
      active: admins.filter(admin => admin.isActive).length,
      inactive: admins.filter(admin => !admin.isActive).length
    };

    res.json({
      success: true,
      count: admins.length,
      admins,
      stats
    });

  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admins'
    });
  }
};

// Create Additional Admin (for existing admins to add new ones)
export const createAdditionalAdmin = async (req, res) => {
  try {
    const { username, email, password, role = 'admin' } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Create admin
    const admin = new Admin({
      username,
      email,
      password,
      role
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'New admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Create additional admin error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error creating admin'
    });
  }
};

// Update Admin Status
export const updateAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Prevent deactivating yourself
    if (req.admin.id === id && !isActive) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account'
      });
    }

    const admin = await Admin.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: `Admin ${isActive ? 'activated' : 'deactivated'} successfully`,
      admin
    });

  } catch (error) {
    console.error('Update admin status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update admin status'
    });
  }
};