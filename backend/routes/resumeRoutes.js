/**
 * Resume Routes
 * Handles resume CRUD operations and PDF generation
 */

const express = require('express');
const router = express.Router();
const {
  createOrUpdateResume,
  getResumes,
  getResume,
  deleteResume,
  generatePDF,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

// All routes are protected (require authentication)
router.use(protect);

// Create or update resume
router.post('/', createOrUpdateResume);

// Get all resumes
router.get('/', getResumes);

// Get specific resume
router.get('/:resumeId', getResume);

// Delete resume
router.delete('/:resumeId', deleteResume);

// Generate PDF
router.get('/:resumeId/pdf', generatePDF);

module.exports = router;
