import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      "kevindb",
      "root",
      "kevin@123",
      {
        host: "localhost",
        dialect: "mysql",
      }
    );
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({ force: false });
      console.log("✅ Database connected successfully.");
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }
}

export default new Database();