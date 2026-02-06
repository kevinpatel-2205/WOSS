import express from "express";
import { main } from "../controllers/mongo.controller.js";

const router = express.Router();
router.get("/", main);

export const mongoRoutes = router;
