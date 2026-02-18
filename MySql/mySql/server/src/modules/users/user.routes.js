import { Router } from "express";
import userController from "./user.controller.js";

const router = Router();

// Define routes - no need to manually pass (req, res)
router.get("/", userController.get.bind(userController));
router.post("/", userController.create.bind(userController));
router.delete("/:id", userController.remove.bind(userController));

export default router;
