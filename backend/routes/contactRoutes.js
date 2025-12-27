import express from 'express';
import { 
  submitContactForm, 
  getAllContacts, 
  updateContactStatus,
  getAdminContacts
} from '../controllers/contactController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', submitContactForm);

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private (admin only)
router.get('/', authenticateAdmin, getAllContacts);

// @route   GET /api/contact/admin/all
// @desc    Get admin contacts
// @access  Private (admin only)
router.get('/admin/all', authenticateAdmin, getAdminContacts);

// @route   PATCH /api/contact/:id/status
// @desc    Update contact status
// @access  Private (admin only)
router.patch('/:id/status', authenticateAdmin, updateContactStatus);

export default router;