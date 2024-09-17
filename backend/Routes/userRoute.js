const { Router } = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
} = require("../Controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const route = Router();
const { resetpasswordrequest, resetpasswordtoken} = require("../Controller/resetpasswordcontroller");

route.post("/", registerUser);
route.post("/login", loginUser);
route.get("/profile", authMiddleware, userProfile);
route.get("/announcements", authMiddleware, isAdmin, userProfile);
route.post('/resetpassword', resetpasswordrequest);
route.post("/resetpassword/:token", resetpasswordtoken);


module.exports = route;
