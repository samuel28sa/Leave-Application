import asyncHandler from "express-async-handler";
import Announcement from "../Model/announcementsModel.js";

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
    res.status(400).json({ message: error.message });
  }
});

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createAnnouncement, getAnnouncements };
