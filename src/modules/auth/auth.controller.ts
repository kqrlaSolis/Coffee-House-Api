import { login } from "./auth.service";
import type { Request, Response } from "express";
import type { LoginDTO } from "./models/auth.dto";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = (req.body || {}) as LoginDTO;

        if (!userName || !password) {
            res.status(400).json({ message: "userName and password are required" });
            return;
        }

        const result = await login(userName, password);

        if (!result) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        res.json(result);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login" });
    }
};
