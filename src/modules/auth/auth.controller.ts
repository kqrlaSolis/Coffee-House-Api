import { login } from "./auth.service";
import type { Request, Response } from "express";
import { LoginSchema } from "./models/auth.dto";
import { AppError } from "../../core/errors/AppError";

export const loginUser = async (req: Request, res: Response) => {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const loginResult = await login(result.data.userName, result.data.password);

    if (!loginResult) {
        throw new AppError(401, "Invalid credentials");
    }

    res.json(loginResult);
};
