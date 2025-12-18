const Class = require('../models/Class');

const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({
            success: true,
            count: classes.length,
            data: classes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching classes',
            error: error.message
        });
    }
};

module.exports = { getAllClasses };