import User from "../models/User.js";

export const loadUsers = async (req, res) => {
  try {
    const result = await User.find();


    res.json({
      success: true,
      message: "Users fetched successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
