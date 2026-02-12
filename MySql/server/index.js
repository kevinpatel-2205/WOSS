import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.config.js";

const app = express();

connectDB.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("MySQL Connected...");
});

  // setTimeout(() => {
  //   connectDB.end((err) => {
  //   if (err) return console.error(err.message);

  //   console.log('Close the database connection.');
  // })
  // }, 1000);

app.use(express.json());
app.use(cors());

app.use(morgan(" method :method\n url :url\n status :status\n responseTime :response-time ms"));


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
