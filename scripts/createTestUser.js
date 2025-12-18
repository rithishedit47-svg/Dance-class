const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

const createTestUser = async () => {
    await connectDB();
    
    try {
        // Delete existing test user
        await User.deleteOne({ email: 'test@test.com' });
        
        // Create new test user
        const testUser = new User({
            firstname: 'Test',
            lastname: 'User',
            email: 'test@test.com',
            phone: '1234567890',
            password: 'test123',
            role: 'user'
        });
        
        const savedUser = await testUser.save();
        console.log('✅ Test user created:', savedUser.email);
        console.log('📧 Email: test@test.com');
        console.log('🔑 Password: test123');
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
    
    mongoose.connection.close();
};

createTestUser();