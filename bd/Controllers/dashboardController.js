const Leave = require("../Models/leave");
const Announcement = require("../Models/announcements");

// Get leave statistics, users currently on leave, current user's leave status, and announcements
const getDashboardStats = async (req, res) => {
  try {
    const leaveStats = await Leave.aggregate([
      {
        $group: {
          _id: "$typeOfLeave",
          total: { $sum: 1 },
        },
      },
    ]);

    let from = new Date();
    let to = new Date();

    if (req.body.filterBy === "today") {
    } else if (req.body.filterBy === "yesterday") {
      from.setDate(from.getDate() - 1);
      to.setDate(to.getDate() - 1);
    }

    const usersOnLeave = await Leave.find({
      fromDate: { $lte: from },
      toDate: { $gte: to },
    }).populate("user", "name department");

    const userLeaveStatus = await Leave.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      leaveStats,
      usersOnLeave,
      userLeaveStatus,
      announcements,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const { title, content, adminId } = req.body;

    if (!title || !content || !adminId) {
      return res
        .status(400)
        .json({ message: "Title, content, and adminId are required." });
    }

    const announcement = new Announcement({
      title,
      content,
      adminId,
    });

    await announcement.save();

    res
      .status(201)
      .json({ message: "Announcement created successfully!", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getDashboardStats,
  createAnnouncement,
  getAnnouncements,
};
