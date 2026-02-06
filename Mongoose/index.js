import dotenv from "dotenv";
import express from "express";
dotenv.config();
import connectDB from "./src/config/db.config.js";
import { mongoRoutes } from "./src/routes/mongo.route.js";

const app = express();
connectDB();

app.use(express.json());

app.use("/api", mongoRoutes);

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
