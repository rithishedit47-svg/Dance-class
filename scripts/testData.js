const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const Contact = require('../models/Contact');
const Enrollment = require('../models/Enrollment');
const Class = require('../models/Class');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

const createTestData = async () => {
    try {
        // Test User
        const testUser = new User({
            firstname: 'Test',
            lastname: 'User',
            email: 'test@example.com',
            phone: '1234567890',
            password: 'test123'
        });
        await testUser.save();
        console.log('✅ Test user created');

        // Test Contact
        const testContact = new Contact({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Test contact message'
        });
        await testContact.save();
        console.log('✅ Test contact created');

        // Test Enrollment
        const testEnrollment = new Enrollment({
            fullName: 'Jane Smith',
            email: 'jane@example.com',
            phone: '9876543210',
            age: 25,
            danceClass: 'Ballet',
            experience: 'Beginner',
            goals: 'Learn dance basics'
        });
        await testEnrollment.save();
        console.log('✅ Test enrollment created');

        // Test Class
        const testClass = new Class({
            name: 'Hip Hop Basics',
            description: 'Learn basic hip hop moves',
            instructor: 'Mike Johnson',
            duration: '60 minutes',
            level: 'Beginner',
            price: 50,
            schedule: 'Mon, Wed - 6:00 PM'
        });
        await testClass.save();
        console.log('✅ Test class created');

        console.log('🎉 All test data created successfully!');
    } catch (error) {
        console.error('❌ Error creating test data:', error);
    }
};

const runTest = async () => {
    await connectDB();
    await createTestData();
    mongoose.connection.close();
};

runTest();