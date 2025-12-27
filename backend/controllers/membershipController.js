import Membership from '../models/MembershipModel.js';

// @desc    Submit membership registration
// @route   POST /api/membership/register
// @access  Public
export const registerMember = async (req, res) => {
  try {
    const { fullName, studentId, email, phone, department, year, interests } = req.body;

    // Validation
    if (!fullName || !studentId || !email || !phone || !department || !year) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }

    // Check if student ID already exists
    const existingMember = await Membership.findOne({ studentId });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'This student ID is already registered'
      });
    }

    // Save to database
    const membership = new Membership({
      fullName,
      studentId,
      email,
      phone,
      department,
      year,
      interests
    });

    await membership.save();

    res.json({
      success: true,
      message: 'Registration submitted successfully! We will contact you soon.',
      data: {
        id: membership._id,
        studentId: membership.studentId
      }
    });
  } catch (error) {
    console.error('Membership registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit registration. Please try again.'
    });
  }
};

// @desc    Get all memberships
// @route   GET /api/membership
// @access  Private (admin only - add auth later)
export const getAllMemberships = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = status ? { status } : {};
    const memberships = await Membership.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Membership.countDocuments(query);

    res.json({
      success: true,
      data: memberships,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Fetch memberships error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch memberships'
    });
  }
};

// @desc    Get admin memberships (all for admin management)
// @route   GET /api/membership/admin/all
// @access  Private (admin only)
export const getAdminMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find()
      .sort({ submittedAt: -1 });

    const stats = {
      total: memberships.length,
      pending: memberships.filter(m => m.status === 'pending').length,
      approved: memberships.filter(m => m.status === 'approved').length,
      rejected: memberships.filter(m => m.status === 'rejected').length
    };

    res.json({
      success: true,
      count: memberships.length,
      memberships,
      stats
    });
  } catch (error) {
    console.error('Get admin memberships error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin memberships'
    });
  }
};

// @desc    Update membership status
// @route   PATCH /api/membership/:id/status
// @access  Private (admin only - add auth later)
export const updateMembershipStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const membership = await Membership.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: membership
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
};
