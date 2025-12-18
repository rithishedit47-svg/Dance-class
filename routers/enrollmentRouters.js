const express = require('express');
const { createEnrollment, getAllEnrollments, deleteEnrollment } = require('../controllers/enrollmentController');
const router = express.Router();

router.post('/enroll', createEnrollment);
router.get('/enroll', getAllEnrollments);
router.delete('/enroll/:id', deleteEnrollment);

module.exports = router;