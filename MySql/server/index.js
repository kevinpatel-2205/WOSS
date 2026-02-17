import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import sequelize, { connectDB } from "./config/db.config.js";

// let connection;
// try {
//   connection = await pool.getConnection();
//   console.log("MySQL Connected...");
// } catch (err) {
//   console.error("Error connecting to MySQL:", err);
// } finally {
//   if (connection) connection.release(); // Only release if connection exists
// }

const app = express();
await connectDB();
await sequelize.sync();
app.use(express.json());
app.use(cors());

app.use(
  morgan(
    " method :method\n url :url\n status :status\n responseTime :response-time ms",
  ),
);

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
