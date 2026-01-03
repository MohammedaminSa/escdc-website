import express from 'express';
import { galleryUpload } from '../config/cloudinary.js';
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

// Public routes
router.get('/', getAllGalleryImages);
router.get('/:id', getGalleryImageById);

// Protected admin routes
router.get('/admin/all', authenticateAdmin, getAdminGalleryImages);
router.post('/upload', authenticateAdmin, galleryUpload.single('media'), uploadGalleryImage);
router.put('/:id', authenticateAdmin, updateGalleryImage);
router.delete('/:id', authenticateAdmin, deleteGalleryImage);

export default router;