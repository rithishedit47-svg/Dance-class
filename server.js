const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/database');
const signupRoutes = require('./routers/signuprouters');
const adminRoutes = require('./routers/adminRouters');
const classRoutes = require('./routers/classRouters');
const contactRoutes = require('./routers/contactRouters');
const enrollmentRoutes = require('./routers/enrollmentRouters');

const app = express();
const PORT = process.env.PORT || 10000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://rad-chimera-3dc2a8.netlify.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', signupRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', classRoutes);
app.use('/api', contactRoutes);
app.use('/api', enrollmentRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Backend API Server Running',
        endpoints: {
            signup: 'POST /api/signup',
            login: 'POST /api/login',
            users: 'GET /api/admin/users',
            stats: 'GET /api/admin/stats',
            deleteUser: 'DELETE /api/admin/users/:id'
        }
    });
});

// API root route
app.get('/api', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({
        success: true,
        message: 'GrooveX Dance School API',
        version: '1.0.0',
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// Database test endpoint
app.get('/api/test-db', async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const states = { 0: 'Disconnected', 1: 'Connected', 2: 'Connecting', 3: 'Disconnecting' };
        
        if (dbState === 1) {
            // Test with a simple query
            const User = require('./models/User');
            const userCount = await User.countDocuments();
            
            res.json({
                success: true,
                database: 'Connected',
                userCount,
                host: mongoose.connection.host,
                name: mongoose.connection.name
            });
        } else {
            res.status(503).json({
                success: false,
                database: states[dbState] || 'Unknown',
                message: 'Database not connected'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database test failed',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Server Error:', error);
    res.status(500).json({
        success: false,
        message: 'Server error: ' + error.message
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 API: http://localhost:${PORT}`);
});
