# 🔍 BACKEND DEBUGGING GUIDE

## ❌ Problem: "Cannot GET /api/auth/check"

### ✅ **The Issue:** Wrong Test URL

**❌ Wrong:** `/api/auth/check` (doesn't exist)
**✅ Correct:** `/api/health` (this exists)

## 🧪 **Test These URLs:**

### 1. Health Check (Should Work):
```
https://escdc-website.onrender.com/api/health
```
**Expected Response:** `{"status":"ok","message":"ESCDC API is running"}`

### 2. Auth Verify (Should Work):
```
https://escdc-website.onrender.com/api/auth/verify
```
**Expected Response:** `{"success":false,"message":"No token provided"}`

### 3. Root URL (Should Show Error):
```
https://escdc-website.onrender.com/
```
**Expected:** Some response (even if error)

## 🔧 **If Backend Not Responding:**

### Check Render Logs:
1. **Go to Render Dashboard**
2. **Click your backend service**
3. **Click "Logs" tab**
4. **Look for errors**

### Common Issues:

#### **Issue 1: Build Failed**
**Symptoms:** Service shows "Build Failed"
**Fix:** Check build command is: `cd backend && npm install`

#### **Issue 2: Start Failed**
**Symptoms:** Build succeeds but service won't start
**Fix:** Check start command is: `cd backend && npm start`

#### **Issue 3: Port Issues**
**Symptoms:** "Port already in use" or similar
**Fix:** Render automatically assigns PORT, should work

#### **Issue 4: Environment Variables**
**Symptoms:** MongoDB connection errors
**Fix:** Check all environment variables are set correctly

## 📋 **Render Configuration Checklist:**

### Build Settings:
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`
- **Root Directory:** (empty/blank)

### Environment Variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:admin1234@cluster0.wd9esuy.mongodb.net/escdc?retryWrites=true&w=majority
JWT_SECRET=ESCDC-2024-HaramayaUniversity-SecureJWT-Key-32Chars-Production
FRONTEND_URL=https://your-vercel-url.vercel.app
```

## 🚨 **If Still Not Working:**

### Option 1: Redeploy
1. **Go to Render Dashboard**
2. **Click "Manual Deploy"**
3. **Select latest commit**

### Option 2: Check Package.json
The backend should have these scripts:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Option 3: Alternative Platforms
If Render keeps failing:
- **Cyclic.sh** (very reliable)
- **Railway** (if quota reset)
- **Heroku** (classic choice)

## ✅ **Success Indicators:**

1. **Health endpoint works:** `/api/health`
2. **Auth endpoint responds:** `/api/auth/verify`
3. **Render logs show:** "ESCDC Backend running on..."
4. **No error messages** in Render logs

**Test the `/api/health` endpoint first - that's the correct test URL!**