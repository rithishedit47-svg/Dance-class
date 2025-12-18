const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

const cleanupUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dance_school');
        console.log('Connected to MongoDB');

        // Delete all existing users to avoid plain text password issues
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} existing users`);
        
        console.log('Cleanup completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Cleanup failed:', error);
        process.exit(1);
    }
};

cleanupUsers();