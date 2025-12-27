# 🚨 URGENT FIX - Two Issues to Resolve

## ❌ **Problem 1: Wrong API URL**
The error shows: `https://escdc-website.onrender.com/auth/login`
Should be: `https://escdc-website.onrender.com/api/auth/login`

## ❌ **Problem 2: CORS Still Blocked**
Backend not allowing requests from frontend

## ✅ **SOLUTION - Fix Both Issues:**

### **Step 1: Fix Vercel Environment Variable**

1. **Go to Vercel Dashboard** → Your project → Settings → Environment Variables
2. **Find `VITE_API_URL`** and update it to:
   ```
   https://escdc-website.onrender.com/api
   ```
   (Make sure it ends with `/api`)
3. **Save and redeploy** frontend

### **Step 2: Fix Render Environment Variable**

1. **Go to Render Dashboard** → Your backend service → Environment
2. **Update `FRONTEND_URL`** to:
   ```
   https://escdc-website.vercel.app
   ```
   (No trailing slash, must be https)
3. **Save** - Render will redeploy

### **Step 3: Wait for Both to Deploy**
- **Vercel:** 1-2 minutes
- **Render:** 2-3 minutes

## 🧪 **Test After Both Deploy:**

1. **Check API URL** - Open browser console and run:
   ```javascript
   console.log('API URL:', import.meta.env.VITE_API_URL);
   ```
   Should show: `https://escdc-website.onrender.com/api`

2. **Test backend health:**
   ```
   https://escdc-website.onrender.com/api/health
   ```
   Should return: `{"status":"ok","message":"ESCDC API is running"}`

3. **Try login again** - CORS error should be gone

## 🚨 **If Still Not Working:**

### **Quick Debug:**
Open browser console and run:
```javascript
// Check what API URL is being used
console.log('Current API URL:', import.meta.env.VITE_API_URL);

// Test direct API call
fetch('https://escdc-website.onrender.com/api/health')
  .then(res => res.json())
  .then(data => console.log('Backend Health:', data))
  .catch(err => console.error('Backend Error:', err));
```

### **Alternative: Temporary CORS Fix**
If you can't wait, temporarily set in Render:
```
FRONTEND_URL=*
```
(Not secure, but will work for testing)

## ✅ **Success Indicators:**
- ✅ Browser console shows correct API URL
- ✅ Backend health check works
- ✅ No CORS errors in console
- ✅ Login shows "Invalid credentials" instead of network error

**BOTH environment variables need to be updated - Vercel AND Render!**