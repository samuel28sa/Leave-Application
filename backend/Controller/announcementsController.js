const asyncHandler = require("express-async-handler");
const Announcement = require("../Model/announcementsModel"); // Adjust the path as necessary

const createAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const announcement = new Announcement({ title, content });
    const createdAnnouncement = await announcement.save();

    res.status(201).json(createdAnnouncement);
  } catch (error) {
    // Handle any errors that occurred during the process
    res.status(400).json({ message: error.message });
  }
});

module.exports = createAnnouncement;

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
};
