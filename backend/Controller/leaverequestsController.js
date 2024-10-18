import asyncHandler from "express-async-handler";
import leaveRequest from "../Model/leaverequestsModel.js";

const createLeaveRequest = async (req, res) => {
  const { userId, type, reason, startDate, endDate } = req.body;

  try {
    if (!userId || !type || !reason || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const leaverequest = new leaveRequest({
      userId,
      type,
      reason,
      startDate,
      endDate,
    });

    await leaverequest.save();
    res.status(201).json({ message: "Leave request Successfully created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const calculateApproved = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is in req.user
    const approvedLeaves = await leaveRequest.countDocuments({ userId, status: "approved" });

    res.status(200).json({ totalApproved: approvedLeaves });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

const getUserLeaveRequests = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const leaves = await leaveRequest.find({ userId });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getLeaveRequestsByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const leaves = await leaveRequest.find({ userId });

    if (!leaves.length) {
      return res.status(404).json({ message: "No leave requests found for this user." });
    }

    res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get all leave requests
const getAllLeaveRequests = asyncHandler(async (req, res) => {
  try {
    const leaves = await LeaveModel.find({}); // Fetch all leave requests

    if (!leaves.length) {
      return res.status(404).json({ message: "No leave requests found." });
    }

    res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export { createLeaveRequest, getUserLeaveRequests, calculateApproved, getLeaveRequestsByUser, getAllLeaveRequests };
