import historyModel from "../Model/historyModel.js";

const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const leaveHistory = await historyModel.find({ user: userId });

    res.status(200).json({
      data: leaveHistory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving balance history" });
  }
};

const createHistory = async (req, res) => {
  try {
    const {} = req.body;
  } catch (error) {}
};

export { getHistory, createHistory };
