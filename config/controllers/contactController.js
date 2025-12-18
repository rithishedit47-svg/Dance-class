const Contact = require('../models/Contact');

const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();
        res.status(201).json({ success: true, message: 'Message sent successfully', data: savedContact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createContact, getAllContacts };