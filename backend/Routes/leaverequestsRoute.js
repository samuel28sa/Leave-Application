import { Router } from "express";
const router = Router();

import { createleaverequests } from "../Controller/leaverequestsController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

router.post("/", authMiddleware, isAdmin, createleaverequests);
export default router;
