import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import pool from "./config/db.config.js";

const app = express();
try {
const connection = await pool.getConnection();
console.log("MySQL Connected...");
connection.release();
} catch (err) {
  console.error("Error connecting to MySQL:", err);
}

app.use(express.json());
app.use(cors());

app.use(
  morgan(
    " method :method\n url :url\n status :status\n responseTime :response-time ms",
  ),
);

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
