/**
 * Authentication Routes
 * Handles user registration, login, and authentication
 */

const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, getAllUsers, deleteUser, deleteUserByEmail, clearAllUsers } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);

// 🔧 Admin routes (for debugging/development)
router.get('/admin/users', getAllUsers);                    // Get all users
router.delete('/admin/users/:userId', deleteUser);          // Delete user by ID
router.delete('/admin/email/:email', deleteUserByEmail);    // Delete user by email
router.post('/admin/clear-all', clearAllUsers);             // Clear all users (needs password)

module.exports = router;
