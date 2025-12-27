import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { 
  getAllResources, 
  uploadResource, 
  downloadResource, 
  deleteResource,
  getAdminResources,
  updateResource,
  getResourceById
} from '../controllers/resourceController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/resources';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|ppt|pptx|xls|xlsx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Only document files are allowed!'));
    }
  }
});

// Public routes
router.get('/', getAllResources);
router.get('/download/:id', downloadResource);
router.get('/:id', getResourceById);

// Protected admin routes
router.get('/admin/all', authenticateAdmin, getAdminResources);
router.post('/upload', authenticateAdmin, upload.single('file'), uploadResource);
router.put('/:id', authenticateAdmin, updateResource);
router.delete('/:id', authenticateAdmin, deleteResource);

export default router;