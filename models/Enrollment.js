const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    danceClass: { type: String, required: true },
    experience: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    startDate: { type: Date, required: true },
    goals: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);