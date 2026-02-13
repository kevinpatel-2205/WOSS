import express from "express";
import {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/query.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userID", getUserByID);
router.post("/", createUser);
router.put("/:userID", updateUser);
router.delete("/:userID", deleteUser);

export default router;
