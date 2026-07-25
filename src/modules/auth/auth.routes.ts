import { Router } from "express";
import { loginUser } from "./auth.controller";
import { authLimiter } from "../../core/middleware/rateLimit";

const router = Router();

router.post("/login", authLimiter, loginUser);

export default router;
