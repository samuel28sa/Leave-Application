import { Router } from "express";
const router = Router();
// const announcementsController = require("../controllers/announcementsController");
import { createAnnouncement } from "../Controller/announcementsController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
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

export default router;
