# 🔑 CLOUDINARY SETUP - GET YOUR CREDENTIALS

## 📋 **Step 1: Create Free Cloudinary Account (2 minutes)**

1. **Go to:** https://cloudinary.com
2. **Click "Sign Up for Free"**
3. **Fill out the form:**
   - Email: your email
   - Password: create password
   - Cloud Name: choose a name (e.g., "escdc-haramaya")
4. **Verify your email**
5. **Login to dashboard**

## 🔑 **Step 2: Get Your Credentials (1 minute)**

1. **Go to Dashboard** (should open automatically)
2. **Look for "Account Details" section**
3. **Copy these 3 values:**

```
Cloud Name: [your_cloud_name]
API Key: [your_api_key] 
API Secret: [your_api_secret]
```

## ⚙️ **Step 3: Add to Render Environment (2 minutes)**

1. **Go to Render Dashboard** → Your backend service
2. **Click "Environment" tab**
3. **Add these 3 new variables:**

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Click "Save Changes"**
5. **Render will automatically redeploy** (2-3 minutes)

## ✅ **Step 4: Test Upload**

1. **Wait for Render to finish deploying**
2. **Go to your admin dashboard**
3. **Try uploading a photo to Gallery**
4. **Reload the page** - photo should still be there!

## 🎉 **Success!**

Your photos will now be stored permanently on Cloudinary and will **never disappear** when the server restarts!

## 📊 **Free Tier Limits:**
- **Storage:** 25GB (more than enough)
- **Bandwidth:** 25GB/month
- **Transformations:** 25,000/month
- **Perfect for your ESCDC website!**

---

**IMPORTANT:** Make sure to add the environment variables to Render, not just your local .env file!