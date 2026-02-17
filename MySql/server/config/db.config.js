import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("kevindb", "root", "kevin@123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected Successfully ✅");
  } catch (error) {
    console.error("Database Connection Failed ❌", error);
  }
};

export default sequelize;
