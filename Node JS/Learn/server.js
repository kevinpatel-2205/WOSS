import dotenv from "dotenv";
import express from "express";
dotenv.config();
import connectDB from "./src/config/db.config.js";
import { apiLimiter } from "./src/middleware/rateLimit.middleware.js";
import { authRoutes } from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(apiLimiter);
app.use("/api/auth", authRoutes);

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
