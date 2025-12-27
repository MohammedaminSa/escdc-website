# 🚀 ESCDC Website Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ **Required Changes Before Deployment:**

1. **Update Backend Environment Variables:**
   ```bash
   # In backend/.env
   NODE_ENV=production
   JWT_SECRET=your-super-secure-32-character-secret-key
   FRONTEND_URL=https://your-frontend-domain.com
   MONGODB_URI=your-production-mongodb-connection
   ```

2. **Update Frontend Environment Variables:**
   ```bash
   # In frontend/.env
   VITE_API_URL=https://your-backend-domain.com/api
   ```

3. **Build Frontend for Production:**
   ```bash
   cd frontend
   npm run build
   ```

## 🌐 **Deployment Options**

### **Option 1: Vercel + Railway (Recommended)**

#### **Frontend (Vercel):**
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL=https://your-backend.railway.app/api`
4. Deploy automatically

#### **Backend (Railway):**
1. Connect GitHub repo to Railway
2. Set environment variables in Railway:
   - `NODE_ENV=production`
   - `JWT_SECRET=your-secure-secret`
   - `FRONTEND_URL=https://your-app.vercel.app`
   - `MONGODB_URI=your-mongodb-connection`
3. Deploy automatically

### **Option 2: Netlify + Render**

#### **Frontend (Netlify):**
1. Drag and drop `frontend/dist` folder to Netlify
2. Or connect GitHub repo
3. Set build command: `npm run build`
4. Set publish directory: `dist`

#### **Backend (Render):**
1. Connect GitHub repo to Render
2. Set environment variables
3. Deploy as web service

### **Option 3: Traditional VPS**

#### **Server Setup:**
```bash
# Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone and setup
git clone your-repo
cd backend
npm install
pm2 start server.js --name escdc-backend

# Setup Nginx for frontend
sudo apt install nginx
# Copy frontend/dist to /var/www/html
```

## 🔒 **Security Checklist**

- [ ] Change JWT_SECRET to a strong random string (32+ characters)
- [ ] Set NODE_ENV=production
- [ ] Update CORS origins to production domains only
- [ ] Use HTTPS for all connections
- [ ] Whitelist production IPs in MongoDB Atlas
- [ ] Remove any console.log statements
- [ ] Set up proper error logging

## 📁 **File Structure for Deployment**

```
escdc-website/
├── backend/
│   ├── .env (production values)
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── .env (production values)
│   ├── dist/ (built files)
│   └── package.json
└── DEPLOYMENT.md
```

## 🧪 **Testing Before Deployment**

1. **Test Production Build Locally:**
   ```bash
   # Frontend
   cd frontend
   npm run build
   npm run preview
   
   # Backend
   cd backend
   NODE_ENV=production npm start
   ```

2. **Test All Features:**
   - [ ] Admin login/setup
   - [ ] File uploads (gallery, resources, leadership)
   - [ ] Contact form
   - [ ] Membership registration
   - [ ] All CRUD operations

## 🔧 **Environment Variables Summary**

### **Backend (.env):**
```env
PORT=5002
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/escdc
JWT_SECRET=your-32-character-secret-key
FRONTEND_URL=https://your-frontend-domain.com
```

### **Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🚨 **Common Deployment Issues**

1. **CORS Errors:** Update FRONTEND_URL in backend
2. **API Not Found:** Check VITE_API_URL in frontend
3. **MongoDB Connection:** Whitelist deployment server IP
4. **File Uploads:** Ensure upload directories exist
5. **JWT Errors:** Use strong JWT_SECRET

## 📞 **Support**

If you encounter issues:
1. Check server logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas connection

---

**🎉 Your ESCDC website is ready for deployment!**