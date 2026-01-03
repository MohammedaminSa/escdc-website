import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Gallery storage
const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'escdc/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
  },
});

// Leadership storage
const leadershipStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'escdc/leadership',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'fill', quality: 'auto' }]
  },
});

// Event storage (supports images and videos)
const eventStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'escdc/events',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'],
    resource_type: 'auto',
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
  },
});

// Resource storage (supports all file types)
const resourceStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'escdc/resources',
    resource_type: 'auto'
  },
});

export const galleryUpload = multer({ 
  storage: galleryStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export const leadershipUpload = multer({ 
  storage: leadershipStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const eventUpload = multer({ 
  storage: eventStorage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit for videos
});

export const resourceUpload = multer({ 
  storage: resourceStorage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});

export { cloudinary };