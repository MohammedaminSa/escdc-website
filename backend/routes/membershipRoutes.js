import express from 'express';
import { 
  registerMember, 
  getAllMemberships, 
  updateMembershipStatus,
  getAdminMemberships
} from '../controllers/membershipController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/membership/register
// @desc    Submit membership registration
// @access  Public
router.post('/register', registerMember);

// @route   GET /api/membership
// @desc    Get all memberships
// @access  Private (admin only)
router.get('/', authenticateAdmin, getAllMemberships);

// @route   GET /api/membership/admin/all
// @desc    Get admin memberships
// @access  Private (admin only)
router.get('/admin/all', authenticateAdmin, getAdminMemberships);

// @route   PATCH /api/membership/:id/status
// @desc    Update membership status
// @access  Private (admin only)
router.patch('/:id/status', authenticateAdmin, updateMembershipStatus);

export default router;