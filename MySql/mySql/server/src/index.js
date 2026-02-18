import express from "express";
import { connectDB } from "./config/database.js";
import userRouter from "./modules/users/user.routes.js";

const app = express();
app.use(express.json());

// Initialize Database
connectDB();

// User Routes (Mimicking NestJS Controller routing)
app.use("/api/users", userRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
