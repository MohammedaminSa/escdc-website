import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getAllLeadership,
  getLeadershipByCategory,
  createLeadership,
  updateLeadership,
  deleteLeadership,
  getLeadershipById,
  getAdminLeadership,
  uploadLeadershipImage
} from '../controllers/leadershipController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/leadership';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `leadership-${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Public routes
router.get('/', getAllLeadership);
router.get('/category/:category', getLeadershipByCategory);
router.get('/:id', getLeadershipById);

// Protected admin routes
router.get('/admin/all', authenticateAdmin, getAdminLeadership);
router.post('/', authenticateAdmin, createLeadership);
router.put('/:id', authenticateAdmin, updateLeadership);
router.delete('/:id', authenticateAdmin, deleteLeadership);
router.post('/:id/image', authenticateAdmin, upload.single('image'), uploadLeadershipImage);

export default router;