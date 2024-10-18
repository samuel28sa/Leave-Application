import { Router } from "express";
const router = Router();

// const { getHistory } = require("../Controller/historyController");
import { getHistory } from "../Controller/historyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/:userId", getHistory);

export default router;
