# 🔐 AUTHENTICATION DEBUGGING GUIDE

## ❌ Problem: Login/Setup pages don't redirect to admin dashboard

### 🧪 **Step 1: Test API Endpoints Directly**

Open your browser console (F12) and test these:

#### Test Setup Endpoint:
```javascript
fetch('https://escdc-website.onrender.com/api/auth/setup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'testadmin',
    email: 'test@example.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log('Setup Response:', data))
.catch(err => console.error('Setup Error:', err));
```

#### Test Login Endpoint:
```javascript
fetch('https://escdc-website.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'testadmin',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log('Login Response:', data))
.catch(err => console.error('Login Error:', err));
```

### 🔍 **Step 2: Check Browser Console**

1. **Open your website**
2. **Press F12** → Console tab
3. **Try to login/setup**
4. **Look for error messages**

### 🚨 **Common Issues & Solutions:**

#### **Issue 1: CORS Error**
**Symptoms:** "Access to fetch blocked by CORS policy"
**Solution:** Update FRONTEND_URL in Render backend environment

#### **Issue 2: Network Error**
**Symptoms:** "Failed to fetch" or "Network error"
**Solution:** Check if backend is running at `/api/health`

#### **Issue 3: 404 Not Found**
**Symptoms:** "Cannot POST /api/auth/login"
**Solution:** Check backend routes are properly configured

#### **Issue 4: MongoDB Connection Error**
**Symptoms:** "MongoServerError" in backend logs
**Solution:** Check MongoDB URI in Render environment

#### **Issue 5: JWT Token Issues**
**Symptoms:** Login succeeds but dashboard doesn't load
**Solution:** Check localStorage for token storage

### 📋 **Environment Variables Check:**

#### **Vercel Frontend:**
```
VITE_API_URL=https://escdc-website.onrender.com/api
```

#### **Render Backend:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:admin1234@cluster0.wd9esuy.mongodb.net/escdc?retryWrites=true&w=majority
JWT_SECRET=ESCDC-2024-HaramayaUniversity-SecureJWT-Key-32Chars-Production
FRONTEND_URL=https://your-vercel-url.vercel.app
```

### 🔧 **Quick Fixes:**

#### **Fix 1: Update CORS**
1. Go to Render → Your backend → Environment
2. Update `FRONTEND_URL` to your exact Vercel URL
3. Wait for redeploy

#### **Fix 2: Check API URL**
1. Go to Vercel → Your project → Settings → Environment Variables
2. Ensure `VITE_API_URL` ends with `/api`
3. Redeploy frontend

#### **Fix 3: Test Backend Health**
Visit: `https://escdc-website.onrender.com/api/health`
Should return: `{"status":"ok","message":"ESCDC API is running"}`

### 🧪 **Manual Testing Steps:**

1. **Test backend health** → Should work
2. **Test setup endpoint** → Should create admin
3. **Test login endpoint** → Should return token
4. **Check localStorage** → Should store token
5. **Visit /admin** → Should load dashboard

### 📱 **Browser Console Commands:**

Check if token is stored:
```javascript
console.log('Token:', localStorage.getItem('adminToken'));
console.log('User:', localStorage.getItem('adminUser'));
```

Clear stored data (if needed):
```javascript
localStorage.removeItem('adminToken');
localStorage.removeItem('adminUser');
```

### ✅ **Success Indicators:**

- ✅ Backend health check works
- ✅ Setup/login API calls return success
- ✅ Token stored in localStorage
- ✅ No CORS errors in console
- ✅ Admin dashboard loads

**Start with Step 1 - test the API endpoints directly in browser console!**