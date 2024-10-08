// import express from "express";
// const app = express();
// const mongoose = require("mongoose");
import leaveRequest from "../Model/leaverequestsModel.js";
import asyncHandler from "express-async-handler";

const createleaverequests = asyncHandler(async (req, res) => {
  try {
    const { start_date, end_date, reason } = req.body;

    const leaverequests = new leaverequests({
      userId: req.user._id,
      start_date,
      end_date,
      reason,
    });

    await leaverequest.save();
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { createleaverequests };
