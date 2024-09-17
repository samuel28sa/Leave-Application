const express = require("express");
const router = express.Router();

const leaveRequest = require("../Controller/leaverequestsController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, isAdmin, leaveRequest);
module.exports = router;
