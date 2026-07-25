import { getUsers, getUserById, createUser, updateUser, deleteUser } from "./user.service";
import type { Request, Response } from "express";
import { CreateUserSchema, UpdateUserSchema } from "./models/user.dto";
import { AppError } from "../../core/errors/AppError";

export const listUsers = async (_req: Request, res: Response) => {
    const users = await getUsers();
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new AppError(400, "Invalid user ID");
    }

    const user = await getUserById(id);

    if (!user) {
        throw new AppError(404, "User not found");
    }

    res.json(user);
};

export const newUser = async (req: Request, res: Response) => {
    const result = CreateUserSchema.safeParse(req.body);

    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const user = await createUser(result.data);
    res.status(201).json(user);
};

export const updatingUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new AppError(400, "Invalid user ID");
    }

    const result = UpdateUserSchema.safeParse(req.body);

    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const user = await updateUser(id, result.data);
    res.json(user);
};

export const removingUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new AppError(400, "Invalid user ID");
    }

    const user = await deleteUser(id);
    res.json(user);
};
