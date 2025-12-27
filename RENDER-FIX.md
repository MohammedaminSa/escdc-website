# 🔧 RENDER DEPLOYMENT FIX

## ❌ Problem: 
Render is trying to build frontend instead of backend

## ✅ Solution: Update Render Configuration

### In Render Dashboard:

1. **Go to your service settings**
2. **Update Build Command to:**
```
cd backend && npm install
```

3. **Update Start Command to:**
```
cd backend && npm start
```

4. **Set Root Directory to:** (leave blank or set to root)

### Alternative: Deploy Backend Only

1. **Create a new repository** with just the backend folder
2. **Or use these exact settings in Render:**

**Build Command:**
```bash
if [ -d "backend" ]; then cd backend && npm install; else npm install; fi
```

**Start Command:**
```bash
if [ -d "backend" ]; then cd backend && npm start; else npm start; fi
```

## 🚀 Quick Fix: Try These Settings

**Environment:** Node
**Build Command:** `cd backend && npm install`
**Start Command:** `cd backend && npm start`
**Root Directory:** (leave empty)

## 📋 Environment Variables (Don't forget these):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:admin1234@cluster0.wd9esuy.mongodb.net/escdc?retryWrites=true&w=majority
JWT_SECRET=ESCDC-2024-HaramayaUniversity-SecureJWT-Key-32Chars-Production
FRONTEND_URL=https://escdc-website.vercel.app
```

## 🔄 If Still Not Working:

### Option 1: Separate Backend Repository
1. Create new GitHub repo with just backend folder
2. Deploy that to Render

### Option 2: Use Different Platform
- **Cyclic.sh** (free Node.js hosting)
- **Heroku** (free tier available)
- **Glitch.com** (free hosting)

**The backend should deploy successfully with these settings!**