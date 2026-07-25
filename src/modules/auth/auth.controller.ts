import { login } from "./auth.service";
import type { Request, Response } from "express";
import { LoginSchema } from "./models/auth.dto";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const result = LoginSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const loginResult = await login(result.data.userName, result.data.password);

        if (!loginResult) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        res.json(loginResult);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login" });
    }
};
