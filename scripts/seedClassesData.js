const mongoose = require('mongoose');
const Class = require('../models/Class');
require('dotenv').config();

const classesData = [
  {
    name: 'Ballet',
    description: 'Classical ballet training focusing on technique, grace, and discipline. Perfect for all ages.',
    instructor: 'Sarah Johnson',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '5:00 PM'
    },
    duration: '90 minutes',
    level: 'Beginner',
    price: 120,
    maxStudents: 15,
    currentStudents: 12,
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Hip Hop',
    description: 'Urban dance styles with high-energy choreography. Learn breaking, popping, and locking.',
    instructor: 'Marcus Williams',
    schedule: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      time: '6:00 PM'
    },
    duration: '75 minutes',
    level: 'Intermediate',
    price: 100,
    maxStudents: 20,
    currentStudents: 18,
    image: 'https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Contemporary',
    description: 'Expressive modern dance combining elements of ballet, jazz, and lyrical styles.',
    instructor: 'Emma Davis',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '7:00 PM'
    },
    duration: '90 minutes',
    level: 'Advanced',
    price: 130,
    maxStudents: 12,
    currentStudents: 10,
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Salsa',
    description: 'Latin dance with passionate movements and rhythmic footwork. Partner dancing included.',
    instructor: 'Carlos Rodriguez',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '8:00 PM'
    },
    duration: '60 minutes',
    level: 'Beginner',
    price: 90,
    maxStudents: 16,
    currentStudents: 14,
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Jazz',
    description: 'Energetic and fun dance style with sharp movements and theatrical expressions.',
    instructor: 'Lisa Chen',
    schedule: {
      days: ['Wednesday', 'Friday'],
      time: '6:30 PM'
    },
    duration: '75 minutes',
    level: 'Intermediate',
    price: 110,
    maxStudents: 18,
    currentStudents: 15,
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Bollywood',
    description: 'Vibrant Indian dance combining classical and modern styles with expressive storytelling.',
    instructor: 'Priya Sharma',
    schedule: {
      days: ['Saturday', 'Sunday'],
      time: '4:00 PM'
    },
    duration: '90 minutes',
    level: 'Beginner',
    price: 105,
    maxStudents: 20,
    currentStudents: 16,
    image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Tap Dance',
    description: 'Rhythmic dance style using metal taps on shoes to create percussive sounds and beats.',
    instructor: 'Michael Thompson',
    schedule: {
      days: ['Monday', 'Friday'],
      time: '4:00 PM'
    },
    duration: '60 minutes',
    level: 'Intermediate',
    price: 95,
    maxStudents: 14,
    currentStudents: 8,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Tango',
    description: 'Passionate Argentine dance characterized by dramatic poses and intricate footwork.',
    instructor: 'Isabella Martinez',
    schedule: {
      days: ['Tuesday', 'Saturday'],
      time: '7:30 PM'
    },
    duration: '75 minutes',
    level: 'Advanced',
    price: 140,
    maxStudents: 10,
    currentStudents: 9,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Breakdancing',
    description: 'Athletic street dance featuring spins, freezes, and power moves on the floor.',
    instructor: 'DJ Rodriguez',
    schedule: {
      days: ['Wednesday', 'Saturday'],
      time: '8:00 PM'
    },
    duration: '90 minutes',
    level: 'Advanced',
    price: 125,
    maxStudents: 12,
    currentStudents: 11,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Waltz',
    description: 'Elegant ballroom dance in 3/4 time with smooth, flowing movements across the floor.',
    instructor: 'Victoria Adams',
    schedule: {
      days: ['Thursday', 'Sunday'],
      time: '6:00 PM'
    },
    duration: '60 minutes',
    level: 'Beginner',
    price: 115,
    maxStudents: 14,
    currentStudents: 7,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Flamenco',
    description: 'Traditional Spanish dance with passionate expressions, hand clapping, and heel stamping.',
    instructor: 'Carmen Lopez',
    schedule: {
      days: ['Monday', 'Thursday'],
      time: '7:00 PM'
    },
    duration: '75 minutes',
    level: 'Intermediate',
    price: 135,
    maxStudents: 12,
    currentStudents: 10,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop',
    isActive: true
  },
  {
    name: 'Swing Dance',
    description: 'Lively partner dance from the swing era with spins, lifts, and energetic movements.',
    instructor: 'Robert Miller',
    schedule: {
      days: ['Friday', 'Sunday'],
      time: '7:00 PM'
    },
    duration: '75 minutes',
    level: 'Beginner',
    price: 100,
    maxStudents: 16,
    currentStudents: 13,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop',
    isActive: true
  }
];

async function seedClasses() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('📦 Connected to MongoDB');

    // Clear existing classes
    await Class.deleteMany({});
    console.log('🗑️ Cleared existing classes');

    // Insert new classes
    const insertedClasses = await Class.insertMany(classesData);
    console.log(`✅ Successfully seeded ${insertedClasses.length} classes`);

    console.log('📋 Classes added:');
    insertedClasses.forEach(cls => {
      console.log(`  - ${cls.name} (${cls.instructor})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding classes:', error);
    process.exit(1);
  }
}

seedClasses();