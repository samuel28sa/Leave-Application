const {
  controlLeave,
  createLeave,
  getAllLeaves,
} = require("../Controllers/leaveController.js");

const { Router } = require("express");
const { authMiddleware, isAdmin } = require("../Middleware/authMiddlerware.js");
const route = Router();

route.post("/", authMiddleware, createLeave);
route.get("/:userId", authMiddleware, getAllLeaves);
route.patch("/admin/:leaveId", authMiddleware, isAdmin, controlLeave);

module.exports = route;
