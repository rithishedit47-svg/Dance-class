const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .lean();
        
        console.log(`📊 Fetched ${users.length} users from database`);
        
        res.status(200).json({
            success: true,
            count: users.length,
            data: users.map(user => ({
                ...user,
                createdDate: new Date(user.createdAt).toLocaleDateString(),
                createdTime: new Date(user.createdAt).toLocaleTimeString(),
                lastLoginDate: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'
            }))
        });
    } catch (error) {
        console.error('❌ Error fetching users:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

// Get user statistics
const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const regularUsers = await User.countDocuments({ role: 'user' });
        
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newUsers = await User.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayUsers = await User.countDocuments({
            createdAt: { $gte: today }
        });

        const activeUsers = await User.countDocuments({ isActive: true });

        console.log(`📊 Stats: Total=${totalUsers}, Admins=${totalAdmins}, Users=${regularUsers}, Today=${todayUsers}`);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalAdmins,
                regularUsers,
                newUsers,
                todayUsers,
                activeUsers,
                lastUpdated: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('❌ Error fetching stats:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log(`🗑️ Deleted user: ${deletedUser.email} (${deletedUser.role})`);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: {
                id: deletedUser._id,
                email: deletedUser.email,
                deletedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('❌ Error deleting user:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

// Get single user
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, phone } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstname, lastname, email, phone },
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserStats,
    deleteUser,
    getUser,
    updateUser
};