const User = require('../models/User');

const signup = async (req, res) => {
    try {
        console.log('📝 Signup attempt:', req.body);
        const { firstname, lastname, email, phone, password, role = 'user', adminKey } = req.body;

        // Check admin key for admin registration
        if (role === 'admin' && adminKey !== 'GROOVEX_ADMIN_2024') {
            return res.status(403).json({
                success: false,
                message: 'Invalid admin key'
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            phone,
            password,
            role,
            lastLogin: new Date()
        });

        console.log('💾 Saving user to database...');
        const savedUser = await newUser.save();
        console.log(`✅ New ${role} registered:`, savedUser.email);
        
        res.status(201).json({
            success: true,
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
            data: {
                id: savedUser._id,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email,
                phone: savedUser.phone,
                role: savedUser.role,
                createdAt: savedUser.createdAt,
                lastLogin: savedUser.lastLogin
            }
        });
    } catch (error) {
        console.error('❌ Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user: ' + error.message,
            error: error.message,
        });
    }
};

module.exports = { signup };
