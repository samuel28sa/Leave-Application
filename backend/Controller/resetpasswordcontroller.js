import User from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import AsyncHandler from "express-async-handler";

const resetpasswordrequest = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  console.log("user before update", user);
  // console.log('Generated Token: ', token); // Log the generated token

  try {
    const token = jwt.sign({ id: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Set up Nodemailer for email sending
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your email service
      auth: {
        user: "danielnduka498@gmail.com",
        pass: "fyyuqeqmcdggbpyg",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "youremail@gmail.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested a password reset for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:5000/reset/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors in sending email
    throw new Error(error);
  }

  // Generate a unique token using JWT
});

const resetpasswordtoken = AsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    console.log("Received Token: ", token); // Log the received token

    const decoded = jwt.verify(token, "your_secret_key");
    console.log("Decoded JWT: ", decoded); // Log the decoded JWT

    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log("User from DB: ", user); // Log the user object to check the token and expiry

    if (!user) {
      return res.status(400).send("Token invalid or expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.send("Password reset successfully");
  } catch (error) {
    console.error("Error in Token Verification: ", error); // Log the error
    res.status(400).send("Token invalid or expired");
    ``;
  }
  // return res.send('Email exists in the database');
});

export { resetpasswordrequest, resetpasswordtoken };
