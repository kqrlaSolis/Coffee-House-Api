import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/config";
import type { Role } from "@prisma/client";

export interface JwtPayload {
    id: number;
    userName: string;
    role: Role;
}

export const hashPassword = (password: string) =>
    bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) =>
    bcrypt.compare(password, hash);

export const generateJWT = (payload: JwtPayload): string =>
    jwt.sign(payload, secretKey, {
        expiresIn: "1d",
    });

export const verifyToken = (token: string): JwtPayload =>
    jwt.verify(token, secretKey) as JwtPayload;
