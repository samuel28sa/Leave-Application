const express = require("express");
const router = express.Router();
// const announcementsController = require("../controllers/announcementsController");
const { createAnnouncement } = require("../Controller/announcementsController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
// const adminMiddleware = require("../middleware/adminMiddleware");

// router.get('/', announcementsController.getAnnouncements);
// router.get('/:id', announcementsController.getAnnouncement);

router.post("/", authMiddleware, isAdmin, createAnnouncement);
// router.put(
//   "/:id",
//   authMiddleware,
//   adminMiddleware,
//   announcementsController.updateAnnouncement
// );
// router.delete(
//   "/:id",
//   authMiddleware,
//   adminMiddleware,
//   announcementsController.deleteAnnouncement
// );

module.exports = router;
