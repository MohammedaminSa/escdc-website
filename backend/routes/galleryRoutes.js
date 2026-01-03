import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { 
  getAllGalleryImages, 
  uploadGalleryImage, 
  deleteGalleryImage,
  getAdminGalleryImages,
  updateGalleryImage,
  getGalleryImageById
} from '../controllers/galleryController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/gallery';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for media uploads (images and videos)
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
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for videos
  fileFilter: (req, file, cb) => {
    // Allow images and videos
    const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
    const allowedVideoTypes = /mp4|avi|mov|wmv|flv|webm|mkv/;
    
    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = allowedImageTypes.test(extname) && file.mimetype.startsWith('image/');
    const isVideo = allowedVideoTypes.test(extname) && file.mimetype.startsWith('video/');

    if (isImage || isVideo) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed! Supported formats: JPG, PNG, GIF, WebP, MP4, AVI, MOV, WMV, FLV, WebM, MKV'));
    }
  }
});

// Public routes
router.get('/', getAllGalleryImages);
router.get('/:id', getGalleryImageById);

// Protected admin routes
router.get('/admin/all', authenticateAdmin, getAdminGalleryImages);
router.post('/upload', authenticateAdmin, upload.single('media'), uploadGalleryImage);
router.put('/:id', authenticateAdmin, updateGalleryImage);
router.delete('/:id', authenticateAdmin, deleteGalleryImage);

export default router;