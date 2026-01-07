# ESCDC Website

**Haramaya University - Entrepreneurship and Student Career Development Club**

*Empowering Students. Building Careers. Creating Entrepreneurs.*

## 🌐 Live Website

- **Website:** https://escdc-website-eirx9k5c8-mohammedamins-projects-6fbf8975.vercel.app
- **Admin Dashboard:** https://escdc-website-eirx9k5c8-mohammedamins-projects-6fbf8975.vercel.app/admin

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB Atlas
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer + Local Storage
- **Deployment:** Vercel (Frontend) + Render (Backend)

## ✨ Features

### Public Website
- **9 Complete Pages:** Home, About, Programs, Membership, Leadership, Events, Resources, Gallery, Contact
- **Responsive Design:** Works on all devices
- **Modern UI/UX:** Professional design with animations
- **Contact Form:** Functional contact system
- **Membership Registration:** Student registration system

### Admin Dashboard
- **Secure Authentication:** JWT-based login system
- **Content Management:** Complete CRUD operations for all content
- **File Upload System:** Photos, videos, and documents
- **Multi-Admin Support:** Create multiple admin accounts
- **Management Modules:**
  - Gallery Management (upload/delete images and videos)
  - Resource Management (upload/delete files)
  - Leadership Management (add/edit team members with photos)
  - Event Management (create/edit/delete events with media)
  - Member Management (view/approve registrations)
  - Contact Management (view messages)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/MohammedaminSa/escdc-website.git
cd escdc-website
```

2. **Install dependencies:**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup:**

Create `backend/.env`:
```env
PORT=5002
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5002/api
```

4. **Start Development Servers:**
```bash
# From root directory - starts both servers
npm run dev

# Or manually:
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

5. **Access the application:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5002
- Admin Setup: http://localhost:5173/admin/setup

## 🔐 Admin Setup

1. **First Time Setup:**
   - Go to `/admin/setup`
   - Create your admin account
   - Login at `/admin/login`

2. **Admin Features:**
   - Complete content management system
   - File upload and management
   - User registration handling
   - Contact form management

## 📱 Social Media

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
│   ├── config/            # Database configuration
│   └── uploads/           # File storage
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API services
│   └── public/            # Static assets
├── package.json          # Root package configuration
└── README.md            # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**© 2024 Haramaya University ESCDC - Empowering Students for a Better Future**
