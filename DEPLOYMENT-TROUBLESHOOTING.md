# 🔧 DEPLOYMENT TROUBLESHOOTING

## ❌ Problem: Admin Dashboard Shows "Not Found"

### ✅ Solution 1: Fix Vercel Routing (Most Common)

**The Issue:** Vercel doesn't know how to handle React Router routes

**The Fix:** Add `vercel.json` file to frontend folder

I've created `frontend/vercel.json` - you need to:

1. **Commit and push** this new file to GitHub:
```bash
git add frontend/vercel.json
git commit -m "Add Vercel routing configuration"
git push
```

2. **Vercel will auto-redeploy** with the new configuration

### ✅ Solution 2: Update API URL in Vercel

**The Issue:** Frontend can't connect to backend

**The Fix:** Update environment variable in Vercel dashboard

1. **Go to Vercel dashboard** → Your project → Settings → Environment Variables
2. **Update VITE_API_URL** to: `https://your-render-backend-url.onrender.com/api`
3. **Redeploy** the frontend

### ✅ Solution 3: Check Backend CORS

**The Issue:** Backend blocking frontend requests

**The Fix:** Update backend environment in Render

1. **Go to Render dashboard** → Your backend service → Environment
2. **Update FRONTEND_URL** to: `https://your-vercel-frontend-url.vercel.app`
3. **Service will auto-redeploy**

## 🧪 Testing Steps:

### 1. Test Backend API
Visit: `https://your-backend-url.onrender.com/api/auth/check`
- Should return: `{"message": "Auth API is working"}`

### 2. Test Frontend Routes
- Home: `https://your-frontend-url.vercel.app/`
- Admin Setup: `https://your-frontend-url.vercel.app/admin/setup`
- Admin Login: `https://your-frontend-url.vercel.app/admin/login`

### 3. Check Browser Console
- Press F12 → Console tab
- Look for API errors or CORS errors

## 🔄 Quick Fix Commands:

```bash
# Add the vercel.json file and push
git add frontend/vercel.json frontend/.env
git commit -m "Fix Vercel routing and API URL"
git push
```

## 📋 Environment Variables Checklist:

### Vercel (Frontend):
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Render (Backend):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:admin1234@cluster0.wd9esuy.mongodb.net/escdc?retryWrites=true&w=majority
JWT_SECRET=ESCDC-2024-HaramayaUniversity-SecureJWT-Key-32Chars-Production
FRONTEND_URL=https://your-frontend.vercel.app
```

## 🚨 If Still Not Working:

1. **Check Render logs** for backend errors
2. **Check Vercel build logs** for frontend errors
3. **Test API directly** in browser
4. **Clear browser cache** and try again

**Most likely fix: Push the vercel.json file and update environment variables!**