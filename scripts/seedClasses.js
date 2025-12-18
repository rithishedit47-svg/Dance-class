require('dotenv').config();
const mongoose = require('mongoose');
const Class = require('../models/Class');

const sampleClasses = [
    {
        name: 'Hip Hop Basics',
        description: 'Learn the fundamentals of hip hop dance with energetic moves and urban style.',
        instructor: 'Mike Johnson',
        duration: '60 minutes',
        level: 'Beginner',
        price: 25,
        schedule: {
            days: ['Monday', 'Wednesday', 'Friday'],
            time: '6:00 PM'
        },
        maxStudents: 15,
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop'
    },
    {
        name: 'Contemporary Dance',
        description: 'Express yourself through fluid movements and emotional storytelling.',
        instructor: 'Sarah Williams',
        duration: '75 minutes',
        level: 'Intermediate',
        price: 30,
        schedule: {
            days: ['Tuesday', 'Thursday'],
            time: '7:00 PM'
        },
        maxStudents: 12,
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
    },
    {
        name: 'Salsa Dancing',
        description: 'Learn the passionate rhythms and partner work of traditional salsa.',
        instructor: 'Carlos Rodriguez',
        duration: '90 minutes',
        level: 'Beginner',
        price: 35,
        schedule: {
            days: ['Saturday'],
            time: '2:00 PM'
        },
        maxStudents: 20,
        image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=300&fit=crop'
    },
    {
        name: 'Ballet Advanced',
        description: 'Perfect your technique with advanced ballet positions and combinations.',
        instructor: 'Emma Thompson',
        duration: '90 minutes',
        level: 'Advanced',
        price: 40,
        schedule: {
            days: ['Monday', 'Wednesday', 'Friday'],
            time: '10:00 AM'
        },
        maxStudents: 10,
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop'
    }
];

const seedClasses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
        
        await Class.deleteMany({});
        console.log('Cleared existing classes');
        
        const classes = await Class.insertMany(sampleClasses);
        console.log(`✅ Created ${classes.length} classes`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding classes:', error);
        process.exit(1);
    }
};

seedClasses();