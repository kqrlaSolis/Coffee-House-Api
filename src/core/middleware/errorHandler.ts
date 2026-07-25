import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

interface PrismaError {
    code?: string;
    meta?: { target?: string[] };
}

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        const response: Record<string, unknown> = { message: err.message };
        if (err.errors) response.errors = err.errors;
        res.status(err.statusCode).json(response);
        return;
    }

    const prismaError = err as PrismaError;

    if (prismaError.code === "P2002") {
        const field = prismaError.meta?.target?.[0] ?? "field";
        res.status(409).json({ message: `${field} already exists` });
        return;
    }

    if (prismaError.code === "P2025") {
        res.status(404).json({ message: "Record not found" });
        return;
    }

    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
};
