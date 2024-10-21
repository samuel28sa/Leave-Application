const Leave = require('../Models/leave');

// Get leave statistics and users currently on leave
const getDashboardStats = async (req, res) => {
    try {
        const leaveStats = await Leave.aggregate([
            {
                $group: {
                    _id: '$typeOfLeave',
                    total: { $sum: 1 },
                },
            },
        ]);

        const usersOnLeave = await Leave.find({
            fromDate: { $lte: new Date() },
            toDate: { $gte: new Date() },
        }).populate('user', 'name department');

        res.json({
            leaveStats,
            usersOnLeave,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
