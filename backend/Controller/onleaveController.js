import LeaveModel from "../Model/leaverequestsModel.js";
import asyncHandler from "express-async-handler";

const getLeavesByDate = asyncHandler(async (req, res) => {
  const { range } = req.query;
  let dateFilter;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (range === "Today") {
    dateFilter = { startDate: { $lte: today }, endDate: { $gte: today } };
  } else if (range === "Yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    dateFilter = {
      startDate: { $lte: yesterday },
      endDate: { $gte: yesterday },
    };
  } else if (range === "Last Week") {
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    dateFilter = { startDate: { $gte: lastWeek, $lte: today } };
  } else {
    return res.status(400).json({ message: "Invalid date range" });
  }

  try {
    const leaves = await LeaveModel.find(dateFilter).populate(
      "userId",
      "username email"
    ); // Assuming userId points to the Users model
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { getLeavesByDate };
