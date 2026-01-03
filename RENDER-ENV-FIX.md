# 🔧 RENDER ENVIRONMENT VARIABLES - QUICK FIX

## ❌ **Error:**
```
MongoDB Connection Error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

## ✅ **Solution: Add Environment Variables to Render**

The environment variables exist in your local `.env` file but are **missing from Render dashboard**.

### **Step 1: Go to Render Dashboard**
1. **Go to:** https://dashboard.render.com
2. **Click your backend service**
3. **Click "Environment" tab**

### **Step 2: Add These Variables**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:admin1234@cluster0.wd9esuy.mongodb.net/escdc?retryWrites=true&w=majority
JWT_SECRET=ESCDC-2024-HaramayaUniversity-SecureJWT-Key-32Chars-Production
FRONTEND_URL=https://escdc-website.vercel.app
```

### **Step 3: Save and Deploy**
1. **Click "Save Changes"**
2. **Render will automatically redeploy** (2-3 minutes)
3. **Backend should start successfully**

## ✅ **Expected Result:**
```
🚀 ESCDC Backend running on http://localhost:5002
✅ MongoDB Connected
```

## 🧪 **Test After Deploy:**
Visit: `https://escdc-website.onrender.com/api/health`
Should return: `{"status":"ok","message":"ESCDC API is running"}`

**This is just a configuration issue - add the environment variables and it will work!** 🚀