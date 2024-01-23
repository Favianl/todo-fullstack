import { Router } from "express";
import {
  login,
  register,
  tokenValidation,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/token-validation", tokenValidation);

export default router;
