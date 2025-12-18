require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
        
        const adminUser = new User({
            firstname: 'Admin',
            lastname: 'User',
            email: 'admin@groovex.com',
            phone: '1234567890',
            password: 'admin123',
            role: 'admin'
        });
        
        await adminUser.save();
        console.log('✅ Admin user created successfully');
        console.log('Email: admin@groovex.com');
        console.log('Password: admin123');
        
        process.exit(0);
    } catch (error) {
        if (error.code === 11000) {
            console.log('Admin user already exists');
        } else {
            console.error('Error creating admin:', error.message);
        }
        process.exit(1);
    }
};

createAdmin();