import express from 'express';
import { loginAdmin, verifyToken, createInitialAdmin, createAdditionalAdmin, getAllAdmins, updateAdminStatus } from '../controllers/authController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', loginAdmin);

// Verify token
router.get('/verify', verifyToken);

// Create initial admin (only works if no admin exists)
router.post('/setup', createInitialAdmin);

// Create additional admin (protected route)
router.post('/admins/create', authenticateAdmin, createAdditionalAdmin);

// Get all admins (protected route)
router.get('/admins', authenticateAdmin, getAllAdmins);

// Update admin status (protected route)
router.patch('/admins/:id/status', authenticateAdmin, updateAdminStatus);

export default router;