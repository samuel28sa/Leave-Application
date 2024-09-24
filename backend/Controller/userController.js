import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
const app = express();

app.use(express.json());

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user._id, username: user.username },
      "iamaboyfromnigeriainlagos",
      { expiresIn: "60d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const userProfile = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    // throw new Error(error);
    console.error("Error searching users:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while searching for users" });
  }
});

export { registerUser, loginUser, userProfile };
