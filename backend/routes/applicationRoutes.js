const express = require('express');
const {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  reviewApplication,
  getApplicationsByUser,
  getDashboardStats
} = require('../controllers/applicationController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// GET /api/applications/dashboard/stats - Get dashboard statistics (Coordinator only)
router.get('/dashboard/stats', authorize('coordinator'), getDashboardStats);

// GET /api/applications/user/:userId - Get applications by user
router.get('/user/:userId', getApplicationsByUser);

// GET /api/applications - Get all applications
router.get('/', getApplications);

// GET /api/applications/:id - Get single application
router.get('/:id', getApplication);

// POST /api/applications - Create new application
router.post('/', createApplication);

// PUT /api/applications/:id - Update application
router.put('/:id', updateApplication);

// DELETE /api/applications/:id - Delete application
router.delete('/:id', deleteApplication);

// PUT /api/applications/:id/review - Review application (Coordinator only)
router.put('/:id/review', authorize('coordinator'), reviewApplication);

module.exports = router;