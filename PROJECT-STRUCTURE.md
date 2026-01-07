# 📁 ESCDC Website - Project Structure

## 🎯 **Production-Ready Codebase**

This repository contains the complete source code for the ESCDC (Entrepreneurship and Student Career Development Club) website for Haramaya University.

## 📂 **Directory Structure**

```
escdc-website/
├── 📁 backend/                    # Node.js Express API
│   ├── 📁 config/
│   │   └── database.js            # MongoDB connection
│   ├── 📁 controllers/            # Business logic
│   │   ├── authController.js      # Authentication
│   │   ├── contactController.js   # Contact form
│   │   ├── eventController.js     # Events management
│   │   ├── galleryController.js   # Gallery management
│   │   ├── leadershipController.js # Leadership team
│   │   ├── membershipController.js # Member registration
│   │   └── resourceController.js  # Resources management
│   ├── 📁 middleware/
│   │   └── auth.js               # JWT authentication
│   ├── 📁 models/                # MongoDB schemas
│   │   ├── AdminModel.js         # Admin users
│   │   ├── ContactModel.js       # Contact messages
│   │   ├── EventModel.js         # Events data
│   │   ├── GalleryModel.js       # Gallery media
│   │   ├── LeadershipModel.js    # Leadership team
│   │   ├── MembershipModel.js    # Member registrations
│   │   └── ResourceModel.js      # Resources/documents
│   ├── 📁 routes/                # API endpoints
│   │   ├── authRoutes.js         # /api/auth/*
│   │   ├── contactRoutes.js      # /api/contact/*
│   │   ├── eventRoutes.js        # /api/events/*
│   │   ├── galleryRoutes.js      # /api/gallery/*
│   │   ├── leadershipRoutes.js   # /api/leadership/*
│   │   ├── membershipRoutes.js   # /api/membership/*
│   │   └── resourceRoutes.js     # /api/resources/*
│   ├── 📁 uploads/               # File storage (gitignored)
│   ├── .env.example              # Environment template
│   ├── package.json              # Dependencies
│   └── server.js                 # Main entry point
│
├── 📁 frontend/                   # React Vite Application
│   ├── 📁 public/
│   │   └── escdc-logo.jpg        # Club logo
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── ScrollToTop.jsx   # Scroll utility
│   │   │   └── 📁 ui/            # UI components
│   │   │       ├── button.jsx    # Button component
│   │   │       ├── Footer.jsx    # Site footer
│   │   │       └── Navbar.jsx    # Navigation
│   │   ├── 📁 lib/
│   │   │   └── utils.js          # Utility functions
│   │   ├── 📁 pages/             # Page components
│   │   │   ├── About.jsx         # About page
│   │   │   ├── Admin.jsx         # Admin dashboard
│   │   │   ├── AdminLogin.jsx    # Admin login
│   │   │   ├── AdminSetup.jsx    # Admin setup
│   │   │   ├── Contact.jsx       # Contact page
│   │   │   ├── Events.jsx        # Events page
│   │   │   ├── Gallery.jsx       # Gallery page
│   │   │   ├── Home.jsx          # Homepage
│   │   │   ├── Leadership.jsx    # Leadership page
│   │   │   ├── Membership.jsx    # Membership page
│   │   │   ├── NotFound.jsx      # 404 page
│   │   │   ├── Programs.jsx      # Programs page
│   │   │   └── Resources.jsx     # Resources page
│   │   ├── 📁 services/
│   │   │   └── api.js            # API service functions
│   │   ├── App.jsx               # Main app component
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # React entry point
│   ├── .env.example              # Environment template
│   ├── components.json           # shadcn/ui config
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── vercel.json               # Vercel deployment config
│   └── vite.config.js            # Vite configuration
│
├── .gitignore                     # Git ignore rules
├── package.json                   # Root package config
└── README.md                      # Project documentation
```

## 🔧 **Key Files Explained**

### **Backend Core Files:**
- **`server.js`** - Express server setup, middleware, routes
- **`config/database.js`** - MongoDB Atlas connection
- **`models/*.js`** - Database schemas using Mongoose
- **`controllers/*.js`** - Business logic for each feature
- **`routes/*.js`** - API endpoint definitions
- **`middleware/auth.js`** - JWT authentication middleware

### **Frontend Core Files:**
- **`App.jsx`** - Main React component with routing
- **`pages/*.jsx`** - Individual page components
- **`components/ui/*.jsx`** - Reusable UI components
- **`services/api.js`** - API communication functions
- **`index.css`** - Global styles with Tailwind CSS

### **Configuration Files:**
- **`.env.example`** - Environment variable templates
- **`package.json`** - Dependencies and scripts
- **`vercel.json`** - Frontend deployment configuration
- **`tailwind.config.js`** - CSS framework configuration

## 🚀 **Deployment Ready**

This codebase is production-ready and deployed at:
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 🔒 **Security Features**

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- File type validation
- CORS protection
- Input sanitization

## 📱 **Responsive Design**

- Mobile-first approach
- Tailwind CSS for styling
- Modern UI/UX components
- Cross-browser compatibility

---

**Ready for production deployment and further development!**