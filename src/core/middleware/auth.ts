import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/security";
import type { Role } from "@prisma/client";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const token = header.split(" ")[1];
        const decoded = await verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const authorize = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "Insufficient permissions" });
            return;
        }

        next();
    };
};
