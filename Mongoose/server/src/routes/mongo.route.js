import express from "express";
import { main } from "../controllers/mongo.controller.js";
import { getUsers,loadUsers } from "../controllers/load.controller.js";

const router = express.Router();
router.get("/", main);
router.get("/getUsers", getUsers);
router.post("/loadUsers", loadUsers);

export const mongoRoutes = router;
