const express = require('express');
const {
  getMentors,
  getMentor,
  createMentor,
  updateMentor,
  deleteMentor,
  assignMentor
} = require('../controllers/mentorController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// GET /api/mentors - Get all mentors
router.get('/', getMentors);

// GET /api/mentors/:id - Get single mentor
router.get('/:id', getMentor);

// POST /api/mentors - Create new mentor (Coordinator only)
router.post('/', authorize('coordinator'), createMentor);

// PUT /api/mentors/:id - Update mentor (Coordinator only)
router.put('/:id', authorize('coordinator'), updateMentor);

// DELETE /api/mentors/:id - Delete mentor (Coordinator only)
router.delete('/:id', authorize('coordinator'), deleteMentor);

// PUT /api/mentors/:id/assign/:applicationId - Assign mentor to startup (Coordinator only)
router.put('/:id/assign/:applicationId', authorize('coordinator'), assignMentor);

module.exports = router;