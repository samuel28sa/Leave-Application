const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/users.js");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(process.env.JWT_SECRET, token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = (
        await User.findById(decoded.id).select("-password")
      )?.toObject();

      next();
    } catch (error) {
      console.trace(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (req.user && user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admins only." });
});

module.exports = { authMiddleware, isAdmin };
