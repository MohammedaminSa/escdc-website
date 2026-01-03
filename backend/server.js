import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import contactRoutes from './routes/contactRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import leadershipRoutes from './routes/leadershipRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT  = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL,
        'https://escdc-website.vercel.app',
        'https://escdc-website-git-main-mohammedaminsa.vercel.app',
        'https://escdc-website-mohammedaminsa.vercel.app'
      ]
    : [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175'
      ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/leadership', leadershipRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ESCDC API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ESCDC Backend running on http://localhost:${PORT}`);
});
