import { Router } from "express";
const router = Router();

import { createLeaveRequest, getLeaveRequestsByUser } from "../Controller/leaverequestsController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

router.post("/", authMiddleware, createLeaveRequest);
router.get("/:id", authMiddleware, getLeaveRequestsByUser);
export default router;
