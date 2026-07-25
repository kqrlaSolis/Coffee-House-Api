import { getUsers, getUserById, createUser, updateUser, deleteUser } from "./user.service";
import type { Request, Response } from "express";
import { CreateUserSchema, UpdateUserSchema } from "./models/user.dto";

export const listUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const user = await getUserById(id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

export const newUser = async (req: Request, res: Response) => {
    try {
        const result = CreateUserSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const user = await createUser(result.data);

        res.status(201).json(user);
    } catch (error: any) {
        if (error.code === "P2002") {
            res.status(409).json({ message: "Username already exists" });
            return;
        }
        res.status(500).json({ message: "Error creating user" });
    }
};

export const updatingUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const result = UpdateUserSchema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const user = await updateUser(id, result.data);
        res.json(user);
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(500).json({ message: "Error updating user" });
    }
};

export const removingUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }

        const user = await deleteUser(id);
        res.json(user);
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(500).json({ message: "Error deleting user" });
    }
};
