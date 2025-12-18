const express = require('express');
const { getAllClasses, createClass } = require('../controllers/classController');
const router = express.Router();

router.get('/classes', getAllClasses);
router.post('/classes', createClass);

module.exports = router;