const Class = require('../models/Class');

const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find({ isActive: true })
            .sort({ createdAt: -1 })
            .lean();
        
        const formattedClasses = classes.map(cls => ({
            ...cls,
            id: cls._id,
            price: `$${cls.price}/class`,
            schedule: `${cls.schedule.days.join(', ')} - ${cls.schedule.time}`,
            availability: `${cls.currentStudents}/${cls.maxStudents} students`
        }));
        
        console.log(`📚 Fetched ${classes.length} classes`);
        
        res.status(200).json({
            success: true,
            count: classes.length,
            data: formattedClasses
        });
    } catch (error) {
        console.error('❌ Error fetching classes:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        const savedClass = await newClass.save();
        res.status(201).json({ success: true, data: savedClass });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getAllClasses, createClass };