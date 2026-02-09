import User from "../models/User.js";

export const main = async (req, res) => {
  try {
    // const result = await User.findByRole("admin");
    // const results = await User.find().byRole("admin");

    // const results = await User.findOne();

    // const result = await User.aggregate([
    //   {
    //     $group: {
    //       _id: {
    //         age: "$age",
    //         role: "$role",
    //       },
    //     },
    //   },
    // ]);

    // const result = await User.aggregate([
    //   // stage 1
    //   {
    //     $group: {
    //       _id: {
    //         role: "$role",
    //         age: "$age",
    //       },
    //     },
    //   },
    //   // stage 2
    //   { $match: { "_id.role": "user" } },
    // ]);

    // console.log(results.fullNameAge);
    // console.log(results.getGreeting("Kevin"));

    const result = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      resultlength: result.length,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
