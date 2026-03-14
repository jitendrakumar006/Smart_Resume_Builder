/**
 * Authentication Controller
 * Handles user registration, login, and token generation
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';
    const expireIn = process.env.JWT_EXPIRE || '7d';
    
    console.log('🔑 Generating token with:', { 
      secret: secret.length > 10 ? secret.substring(0, 10) + '...' : '(too short)', 
      expireIn 
    });

    const token = jwt.sign({ id }, secret, {
      expiresIn: expireIn,
    });
    
    console.log('✅ Token generated successfully');
    return token;
  } catch (error) {
    console.error('❌ Token generation error:', error.message);
    throw error;
  }
};

// Register User
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, passwordConfirm } = req.body;

    console.log('📝 Register Request:', { fullName, email, password: '***' });

    // Validate input
    if (!fullName || !email || !password || !passwordConfirm) {
      console.warn('⚠️ Missing fields:', { fullName: !!fullName, email: !!email, password: !!password, passwordConfirm: !!passwordConfirm });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password !== passwordConfirm) {
      console.warn('⚠️ Passwords do not match');
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      console.warn('⚠️ Invalid email format:', email);
      return res.status(400).json({ message: 'Please provide a valid email' });
    }

    // Check if user already exists
    console.log('🔍 Checking if user exists with email:', email);
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.warn('⚠️ Email already exists:', email);
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Create new user
    console.log('✍️ Creating new user...');
    const user = await User.create({
      fullName,
      email,
      password,
    });
    console.log('✅ User created:', user._id);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Registration Error:', err.message);
    console.error('Full Error:', err);
    res.status(500).json({ 
      message: 'Error registering user', 
      error: err.message,
      // In production, remove this - only for debugging
      details: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error('Get User Error:', err);
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// 🔧 ADMIN: Get all users (for debugging)
exports.getAllUsers = async (req, res) => {
  try {
    console.log('📋 Fetching all users...');
    const users = await User.find({}).select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error('Get All Users Error:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// 🔧 ADMIN: Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('🗑️ Deleting user:', userId);
    
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      deletedUser: user.email,
    });
  } catch (err) {
    console.error('Delete User Error:', err);
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// 🔧 ADMIN: Delete user by email
exports.deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log('🗑️ Deleting user with email:', email);
    
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      deletedUser: email,
    });
  } catch (err) {
    console.error('Delete User by Email Error:', err);
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// 🔧 ADMIN: Clear all users (use with caution!)
exports.clearAllUsers = async (req, res) => {
  try {
    const password = req.body.adminPassword;
    
    // Simple password check (in production, use better auth)
    if (password !== 'admin123') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    console.log('⚠️ Clearing all users from database...');
    const result = await User.deleteMany({});
    
    res.status(200).json({
      success: true,
      message: 'All users deleted',
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error('Clear All Users Error:', err);
    res.status(500).json({ message: 'Error clearing users', error: err.message });
  }
};
