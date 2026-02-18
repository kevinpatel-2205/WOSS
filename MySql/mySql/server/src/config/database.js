import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("kevindb", "root", "kevin@123", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set to true to see SQL queries in console
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // sync() creates the table if it doesn't exist
    await sequelize.sync({ alter: true });
    console.log("✅ MySQL Connected with Sequelize");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};
