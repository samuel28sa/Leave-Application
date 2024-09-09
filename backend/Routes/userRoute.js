const { Router } = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
} = require("../Controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");
const route = Router();

route.post("/", registerUser);
route.post("/login", loginUser);
route.get("/profile", authMiddleware, userProfile);
route.get("/announcements", authMiddleware, adminMiddleware, userProfile);

module.exports = route;
