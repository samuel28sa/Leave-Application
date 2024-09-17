import { Router } from "express";
import {
  registerUser,
  loginUser,
  userProfile,
} from "../Controller/userController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
const route = Router();
import {
  resetpasswordrequest,
  resetpasswordtoken,
} from "../Controller/resetpasswordcontroller.js";

route.post("/", registerUser);
route.post("/login", loginUser);
route.get("/profile", authMiddleware, userProfile);
route.get("/announcements", authMiddleware, isAdmin, userProfile);
route.post("/resetpassword", resetpasswordrequest);
route.post("/resetpassword/:token", resetpasswordtoken);

export default route;
