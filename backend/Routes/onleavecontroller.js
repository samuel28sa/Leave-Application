import express from "express";
import { getLeavesByDate } from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", getLeavesByDate, authMiddleware, isAdmin);

export default router;
