# 🚀 ESCDC Website - Ready to Deploy!

## 📤 Step 1: Upload to GitHub (5 minutes)

### Easiest Method - GitHub Desktop:
1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. Click "Add an Existing Repository from your Hard Drive"
4. Select this project folder
5. Click "Create Repository on GitHub.com"
6. Name: `escdc-website`
7. Make it **Public**
8. Click "Publish Repository"

✅ **Done! Your code is now on GitHub**

## 🚂 Step 2: Deploy Backend to Railway (3 minutes)

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `escdc-website`
5. Go to Settings → Set Root Directory: `backend`
6. Go to Variables → Add these:

```
NODE_ENV=production
PORT=5002
MONGODB_URI=mongodb+srv://admin:admin1234@cluster0.wd9esuy.mongodb.net/escdc?retryWrites=true&w=majority
JWT_SECRET=ESCDC-2024-HaramayaUniversity-SecureJWT-Key-32Chars-Production
FRONTEND_URL=https://escdc-website.vercel.app
```

7. Railway will deploy automatically
8. **Copy your Railway URL** (looks like: https://xxx.up.railway.app)

## 🌐 Step 3: Deploy Frontend to Vercel (3 minutes)

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "New Project" → Import `escdc-website`
4. Set:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://YOUR-RAILWAY-URL.up.railway.app/api`
6. Click Deploy

## 🔄 Step 4: Final Update (1 minute)

1. Go back to Railway
2. Update FRONTEND_URL variable with your Vercel URL
3. Done!

## 🎉 Your Website is Live!

Visit your Vercel URL to see your live website!
Admin access: https://your-vercel-url.vercel.app/admin/setup

---
**Total Time: ~12 minutes**