# ☁️ CLOUDINARY SETUP - PERMANENT FILE STORAGE

## 🎯 **Goal: Fix Photo Disappearing Issue**

This will ensure your photos **never disappear** when the server restarts.

## 📋 **Step-by-Step Setup:**

### **Step 1: Create Cloudinary Account (2 minutes)**
1. **Go to:** https://cloudinary.com
2. **Sign up** for free account
3. **Verify email** and login
4. **Go to Dashboard** → Settings → Security
5. **Copy these credentials:**
   ```
   Cloud Name: your_cloud_name
   API Key: your_api_key
   API Secret: your_api_secret
   ```

### **Step 2: Install Cloudinary (1 minute)**
```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

### **Step 3: Update Environment Variables**
Add to your **Render backend environment**:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **Step 4: Create Cloudinary Configuration**
Create `backend/config/cloudinary.js`:
```javascript
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
    transformation: [{ width: 1200, height: 800, crop: 'limit' }]
  },
});

// Leadership storage
const leadershipStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'escdc/leadership',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }]
  },
});

// Event storage
const eventStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'escdc/events',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'],
    resource_type: 'auto'
  },
});

// Resource storage
const resourceStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'escdc/resources',
    resource_type: 'auto'
  },
});

export const galleryUpload = multer({ storage: galleryStorage });
export const leadershipUpload = multer({ storage: leadershipStorage });
export const eventUpload = multer({ storage: eventStorage });
export const resourceUpload = multer({ storage: resourceStorage });
export { cloudinary };
```

### **Step 5: Update Controllers**
Replace the multer configuration in each controller with the Cloudinary versions.

## 🔄 **Migration Process:**

### **For Gallery Controller:**
```javascript
// OLD (local storage)
import multer from 'multer';
const storage = multer.diskStorage({...});

// NEW (Cloudinary)
import { galleryUpload } from '../config/cloudinary.js';
```

### **URL Changes:**
```javascript
// OLD (local path)
url: `/uploads/gallery/${filename}`

// NEW (Cloudinary URL)
url: result.secure_url
```

## ✅ **Benefits After Setup:**

### **Permanent Storage:**
- ✅ Photos **never disappear** on server restart
- ✅ **Reliable** cloud storage with 99.9% uptime
- ✅ **Automatic backups** and redundancy

### **Performance:**
- ✅ **CDN delivery** - fast loading worldwide
- ✅ **Automatic optimization** - compressed images
- ✅ **Responsive images** - different sizes for different devices

### **Features:**
- ✅ **Image transformations** - resize, crop, optimize automatically
- ✅ **Video support** - handle video uploads
- ✅ **Admin panel** - manage files through Cloudinary dashboard

## 📊 **Free Tier Limits:**
- **Storage:** 25GB
- **Bandwidth:** 25GB/month
- **Transformations:** 25,000/month
- **More than enough** for your ESCDC website!

## 🚀 **Implementation Priority:**
**HIGH** - This is essential for production use. Without this fix, your website will appear broken to users when photos disappear.

**Would you like me to implement the Cloudinary integration for you?**