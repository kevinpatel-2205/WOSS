import User from "../models/User.js";

export const main = async (req, res) => {
  try {
    // const result = await User.findByRole("admin");
    // const results = await User.find().byRole("admin");

    const results = await User.findOne();
    console.log(results.fullNameAge);
    console.log(results.getGreeting("Kevin"));

    res.json({
      results,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
