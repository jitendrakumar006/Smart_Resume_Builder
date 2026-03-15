/**
 * Main Server File
 * Initializes Express app and starts the server
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Setup environment FIRST
const setupEnvironment = () => {
  // MongoDB URI - MUST be provided via environment variables
  if (!process.env.MONGODB_URI) {
    console.error('❌ CRITICAL: MONGODB_URI environment variable not set!');
    console.error('Please set MONGODB_URI in Railway Variables or .env file');
    process.exit(1);
  }

  // JWT Secret - MUST be provided
  if (!process.env.JWT_SECRET) {
    console.error('❌ CRITICAL: JWT_SECRET environment variable not set!');
    process.exit(1);
  }

  // JWT Expiration
  if (!process.env.JWT_EXPIRE) {
    process.env.JWT_EXPIRE = '7d';
  }

  // Environment
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }

  // Port
  if (!process.env.PORT) {
    process.env.PORT = '5000';
  }

  // Serve Frontend
  if (!process.env.SERVE_FRONTEND) {
    process.env.SERVE_FRONTEND = 'false';
  }

  console.log('✅ Environment configured:');
  console.log('   - NODE_ENV:', process.env.NODE_ENV);
  console.log('   - PORT:', process.env.PORT);
  console.log('   - MONGODB_URI: ✅ Configured');
  console.log('   - JWT_SECRET: ✅ Configured');
  console.log('   - JWT_EXPIRE:', process.env.JWT_EXPIRE);
};

setupEnvironment();

// ✅ Import routes AFTER environment is setup
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

// Initialize Express app
const app = express();

// Middleware
// CORS configuration - allows frontend to make API requests
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*' 
    : ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
    environment: process.env.NODE_ENV || 'unknown',
    jwtConfigured: !!process.env.JWT_SECRET ? 'Yes ✅' : 'Missing ❌'
  });
});

// Serve React build files (static files) in production
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (process.env.NODE_ENV === 'production' || process.env.SERVE_FRONTEND === 'true') {
  app.use(express.static(frontendBuildPath));
  
  // Handle React Router - all non-API routes go to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// API 404 Route (only for /api routes)
app.get('/api/*', (req, res) => {
  res.status(404).json({ message: 'API Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
