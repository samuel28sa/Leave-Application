// import express from "express";
// const app = express();
// const mongoose = require("mongoose");
// import leaveRequest from "../Model/leaverequestsModel.js";
import asyncHandler from "express-async-handler";

const createleaverequests = asyncHandler(async (req, res) => {
  try {
    const { employee_id, start_date, end_date, reason } = req.body;

    const leaverequests = new leaverequests({
      employee_id,
      start_date,
      end_date,
      reason,
      status: "pending",
      created_at: new Date(),
      updated_at: new Date(),
    });

    await leaverequest.save();
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { createleaverequests };
