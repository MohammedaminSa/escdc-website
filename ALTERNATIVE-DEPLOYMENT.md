# 🆓 FREE Alternative Deployment - Vercel + Render

## 🚂 Backend: Deploy to Render (100% Free)

### Step 1: Upload to GitHub First
- Follow the GitHub upload steps in `🚀-DEPLOY-STEPS.md`

### Step 2: Deploy Backend to Render
1. **Go to:** https://render.com
2. **Sign up** with GitHub (free account)
3. **Click:** "New" → "Web Service"
4. **Connect:** Your `escdc-website` repository
5. **Configure:**
   - **Name:** `escdc-backend`
   - **Root Directory:** (leave empty)
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`

6. **Environment Variables** (click "Advanced"):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:admin1234@cluster0.wd9esuy.mongodb.net/escdc?retryWrites=true&w=majority
JWT_SECRET=ESCDC-2024-HaramayaUniversity-SecureJWT-Key-32Chars-Production
FRONTEND_URL=https://escdc-website.vercel.app
```

7. **Click:** "Create Web Service"
8. **Your backend URL:** `https://escdc-backend.onrender.com`

## 🌐 Frontend: Deploy to Vercel (100% Free)

### Step 1: Deploy Frontend
1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Import:** `escdc-website` repository
4. **Configure:**
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Environment Variables:**
```
VITE_API_URL=https://escdc-backend.onrender.com/api
```

6. **Deploy!**
7. **Your frontend URL:** `https://escdc-website.vercel.app`

### Step 2: Update Backend CORS
1. **Go back to Render dashboard**
2. **Update FRONTEND_URL** environment variable:
```
FRONTEND_URL=https://escdc-website.vercel.app
```

## ✅ Done! Your website is live!

**Website:** https://escdc-website.vercel.app
**Admin:** https://escdc-website.vercel.app/admin/setup

---

## 🆓 Option 2: Netlify + Render

### Backend: Same as above (Render)
### Frontend: Netlify
1. **Go to:** https://netlify.com
2. **Drag and drop** your `frontend/dist` folder
3. **Or connect GitHub** repository

---

## 🆓 Option 3: All-in-One Solutions

### Vercel Full-Stack (Experimental)
- Deploy both frontend and backend to Vercel
- Use Vercel's serverless functions for backend

### Netlify Functions
- Frontend on Netlify
- Backend as Netlify Functions

---

## 💡 Why These Are Better Than Railway:

✅ **Render:** 
- 750 hours/month free (enough for 24/7)
- No credit card required
- Automatic SSL
- Great for Node.js apps

✅ **Vercel:**
- Unlimited bandwidth for personal projects
- Automatic deployments from GitHub
- Perfect for React apps
- Built-in CDN

✅ **Netlify:**
- 100GB bandwidth/month free
- Form handling included
- Great alternative to Vercel

## 🚀 Recommended: Vercel + Render

This combination gives you:
- Professional URLs
- Automatic deployments
- 99.9% uptime
- No usage limits for your project size
- Completely free forever

**Start with Render for backend, then Vercel for frontend!**