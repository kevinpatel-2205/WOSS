import { Router } from "express";
import userController from "./user.controller.js";

const router = Router();

// Define routes - no need to manually pass (req, res)
router.get("/", userController.get);
router.post("/", userController.create);
router.delete("/:id", userController.remove);

export default router;
