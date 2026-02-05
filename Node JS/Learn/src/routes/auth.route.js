import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {
  register,
  login,
  getProfile,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", protect, getProfile);
router.get("/users", protect, authorize("admin"), getAllUsers);

export const authRoutes = router;
