const express = require('express');
const { createContact, getAllContacts } = require('../controllers/contactController');
const router = express.Router();

router.post('/contact', createContact);
router.get('/contact', getAllContacts);

module.exports = router;