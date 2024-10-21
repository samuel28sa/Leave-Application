const Leave = require('../Models/leave');
const User = require('../Models/users');

const createLeave = async (req, res) => {
    const { userId, typeOfLeave, reason, fromDate, toDate } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const totalDays = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1;

        if (totalDays > user.leaveBalance) {
            return res.status(400).json({ message: 'Not enough leave balance' });
        }

        const newLeave = new Leave({
            user: userId,
            typeOfLeave,
            reason,
            fromDate,
            toDate,
            totalDays,
        });

        await newLeave.save();

        user.leaveBalance -= totalDays;
        await user.save();

        res.status(201).json(newLeave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.params.userId }).populate('user');
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const controlLeave = async () => {
    const { status } = req.body;
    try {
        const leave = await Leave.findById(req.params.leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave application not found' });
        }
        leave.status = status;
        await leave.save();
        res.json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    controlLeave, getAllLeaves, createLeave
}
