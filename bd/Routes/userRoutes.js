const { Router } = require("express");
const { authMiddleware, isAdmin } = require("../Middleware/authMiddlerware");
const {
  registerUser,
  userLogin,
  userProfile,
} = require("../Controllers/userController");
const route = Router();

route.post("/", registerUser);
route.post("/login", userLogin);
route.get("/profile", authMiddleware, userProfile);

module.exports = route;
