import { login, register } from "./auth.service";
import type { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "./models/auth.dto";
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

export const registerUser = async (req: Request, res: Response) => {
    const result = RegisterSchema.safeParse(req.body);

    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const registerResult = await register(result.data.userName, result.data.password);
    res.status(201).json(registerResult);
};
