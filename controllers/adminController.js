const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
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
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const regularUsers = await User.countDocuments({ role: 'user' });
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newUsers = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayUsers = await User.countDocuments({ createdAt: { $gte: today } });
        const activeUsers = await User.countDocuments({ isActive: true });
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
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
};

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
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

module.exports = { getAllUsers, getUserStats, deleteUser };