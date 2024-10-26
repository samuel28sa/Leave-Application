const express = require("express");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../Middleware/authMiddlerware");
const {
  getDashboardStats,
  createAnnouncement,
  getAnnouncements,
} = require("../Controllers/dashboardController");

router.get("/stats", authMiddleware, getDashboardStats);
router.post(
  "/create-announcements",
  authMiddleware,
  isAdmin,
  createAnnouncement
);
router.get("/announcements", authMiddleware, getAnnouncements);
module.exports = router;
