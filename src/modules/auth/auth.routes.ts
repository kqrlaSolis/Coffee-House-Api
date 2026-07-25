import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller";
import { authLimiter } from "../../core/middleware/rateLimit";

const router = Router();

router.post("/login", authLimiter, loginUser);
router.post("/register", authLimiter, registerUser);

export default router;
