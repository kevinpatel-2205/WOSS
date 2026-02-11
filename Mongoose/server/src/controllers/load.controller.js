import User from "../models/User.js";
import { faker } from "@faker-js/faker";

// export const getUsers = async (req, res) => {
//   try {
//     console.time("Fetch Users");
//     const result = await User.find();
//     console.timeEnd("Fetch Users");
//     res.json({
//       success: true,
//       message: "Users fetched successfully",
//       result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    
    const result = await User.find()
      .select("name email role age password")
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      success: true,
      message: "Users fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const loadUsers = async (req, res) => {
  try {
    const count = 10000;

    const users = [];

    for (let i = 0; i < count; i++) {
      users.push({
        name: faker.person.fullName(),
        email: `user${i}_${faker.internet.email()}`,
        password: faker.internet.password({ length: 8 }),
        role: faker.helpers.arrayElement(["user", "admin"]),
        age: faker.number.int({ min: 18, max: 60 }),
      });
    }

    await User.deleteMany();
    console.time("Insert Users");
    await User.insertMany(users);
    console.timeEnd("Insert Users");
    return res.status(201).json({
      success: true,
      message: `${count} users inserted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
