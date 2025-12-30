# ESCDC Website

**Haramaya University - Entrepreneurship and Student Career Development Club**

*Empowering Students. Building Careers. Creating Entrepreneurs.*

## 🚀 Quick Start

### Option 1: Easy Startup (Recommended)
```bash
# From the root directory
npm run dev
```
This will start both servers automatically!

### Option 2: Windows Batch Script
```bash
# Double-click start.bat or run:
start.bat
```

### Option 3: Manual (Two terminals)
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:5174 (or next available port)
- Backend: http://localhost:5002
- Admin Dashboard: http://localhost:5174/admin

### 🔧 Troubleshooting

**If pages don't load data after restart:**
1. Make sure both servers are running
2. Check that backend shows "MongoDB Connected" message
3. Verify ports are not in use by other applications
4. Use the `start.bat` script which automatically cleans up ports

**Port already in use error:**
```bash
# Windows - Kill processes on ports
netstat -ano | findstr :5002
taskkill /PID <PID_NUMBER> /F

# Or just use start.bat which does this automatically
```

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB Atlas
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer + Local Storage

## ✨ Features

- ✅ **9 Complete Pages** (Home, About, Programs, Membership, Leadership, Events, Resources, Gallery, Contact)
- ✅ **Secure Admin Dashboard** with authentication
- ✅ **Gallery Management** - Upload and manage event photos
- ✅ **Resource Management** - Upload documents and files
- ✅ **Leadership Management** - Add/edit team members with photos
- ✅ **Event Management** - Create and manage events
- ✅ **Member Management** - View and manage registrations
- ✅ **Contact Management** - Handle contact form submissions
- ✅ **Email Notifications** - Automated email system
- ✅ **Responsive Design** - Works on all devices
- ✅ **Social Media Integration** - Connected social platforms

## ⚙️ Configuration

### Backend (.env)
```env
# Server Configuration
PORT=5002
NODE_ENV=development

# MongoDB Atlas (Update with your connection string)
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/escdc?retryWrites=true&w=majority

# JWT Secret (Change in production)
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5174
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5002/api
```

## 🔐 Admin Setup

1. **First Time Setup:**
   - Go to `/admin/setup`
   - Create your admin account
   - Login at `/admin/login`

2. **Admin Features:**
   - Gallery management (upload/delete images)
   - Resource management (upload/delete files)
   - Leadership management (add/edit members with photos)
   - Event management (create/edit/delete events)
   - Member management (view/approve registrations)
   - Contact management (view messages)

## 🌐 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Update `FRONTEND_URL` to your production domain
3. Use a strong `JWT_SECRET` (32+ characters)
4. Ensure MongoDB Atlas IP whitelist includes your server

### Frontend Deployment
1. Update `VITE_API_URL` to your production backend URL
2. Run `npm run build`
3. Deploy the `dist` folder

## 📱 Social Media Links

- **Facebook:** https://www.facebook.com/escdc.haramaya
- **Telegram:** https://t.me/escdc_haramaya
- **LinkedIn:** https://www.linkedin.com/company/escdc-haramaya

## 📞 Contact Information

- **Location:** Haramaya University, Main Campus, Building II, Office NO. 12
- **Email:** escdc@haramaya.edu.et
- **Phone:** +251 25 553 0325

## 🎯 Project Structure

```
├── backend/                 # Express.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── uploads/           # File storage
│   └── utils/             # Utility functions
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API services
│   └── public/            # Static assets
└── README.md             # This file
```

---

**© 2024 Haramaya University ESCDC - Empowering Students for a Better Future**
