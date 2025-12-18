const mongoose = require('mongoose');
require('dotenv').config();
const Class = require('../models/Class');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

const seedClasses = async () => {
    const classes = [
        {
            name: 'Ballet',
            description: 'Classical ballet training focusing on technique, grace, and discipline. Perfect for all ages.',
            instructor: 'Sarah Johnson',
            duration: '90 minutes',
            level: 'Beginner',
            price: 75,
            schedule: 'Mon, Wed, Fri - 5:00 PM',
            image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop'
        },
        {
            name: 'Hip Hop',
            description: 'Urban dance styles with high-energy choreography. Learn breaking, popping, and locking.',
            instructor: 'Marcus Williams',
            duration: '75 minutes',
            level: 'Intermediate',
            price: 65,
            schedule: 'Tue, Thu, Sat - 6:00 PM',
            image: 'https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=600&h=400&fit=crop'
        },
        {
            name: 'Contemporary',
            description: 'Expressive modern dance combining elements of ballet, jazz, and lyrical styles.',
            instructor: 'Emma Davis',
            duration: '90 minutes',
            level: 'Advanced',
            price: 80,
            schedule: 'Mon, Wed - 7:00 PM',
            image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&h=400&fit=crop'
        }
    ];

    try {
        await Class.deleteMany({});
        await Class.insertMany(classes);
        console.log('Classes seeded successfully');
    } catch (error) {
        console.error('Error seeding classes:', error);
    }
};

const runSeed = async () => {
    await connectDB();
    await seedClasses();
    mongoose.connection.close();
};

runSeed();