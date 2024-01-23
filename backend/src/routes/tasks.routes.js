import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/tasks", auth, getTasks);
router.get("/tasks/:id", auth, getTask);
router.post("/tasks", auth, createTask);
router.patch("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

export default router;
