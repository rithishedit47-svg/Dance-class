const express = require('express');
const { getAllClasses } = require('../controllers/classController');
const router = express.Router();

router.get('/classes', getAllClasses);

module.exports = router;