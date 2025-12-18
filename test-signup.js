const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

const testUserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    password: String,
    role: { type: String, default: 'user' }
}, { timestamps: true });

const TestUser = mongoose.model('TestUser', testUserSchema);

const testSignup = async () => {
    await connectDB();
    
    try {
        const newUser = new TestUser({
            firstname: 'Test',
            lastname: 'User',
            email: 'test@test.com',
            phone: '1234567890',
            password: 'test123'
        });
        
        const savedUser = await newUser.save();
        console.log('✅ User saved successfully:', savedUser);
    } catch (error) {
        console.error('❌ Error:', error);
    }
    
    mongoose.connection.close();
};

testSignup();