const Enrollment = require('../models/Enrollment');

const createEnrollment = async (req, res) => {
    try {
        const enrollment = new Enrollment(req.body);
        const savedEnrollment = await enrollment.save();
        res.status(201).json({ success: true, message: 'Enrollment submitted successfully', data: savedEnrollment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().sort({ createdAt: -1 });
        res.json({ success: true, data: enrollments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
        
        if (!deletedEnrollment) {
            return res.status(404).json({ success: false, message: 'Enrollment not found' });
        }
        
        res.json({ success: true, message: 'Enrollment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createEnrollment, getAllEnrollments, deleteEnrollment };