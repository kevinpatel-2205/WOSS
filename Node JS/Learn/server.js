import dotenv from "dotenv";
import express from "express";
dotenv.config();
import connectDB from "./src/config/db.config.js";
import { apiLimiter } from "./src/middleware/rateLimit.middleware.js";
import { authRoutes } from "./src/routes/auth.route.js";

const app = express();
connectDB();

app.use(express.json());

app.use(apiLimiter);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
