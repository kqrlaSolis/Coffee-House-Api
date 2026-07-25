import { prisma } from "../../core/lib/prisma";
import type { Role } from "@prisma/client";

export type SafeUser = {
    id: number;
    userName: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
};

const userSelect = {
    id: true,
    userName: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    isActive: true,
} as const;

export const UserRepository = {
    async findAll(): Promise<SafeUser[]> {
        return prisma.user.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
            select: userSelect,
        });
    },

    async findById(id: number): Promise<SafeUser | null> {
        return prisma.user.findUnique({
            where: { id, isActive: true },
            select: userSelect,
        });
    },

    async findByUserName(userName: string) {
        return prisma.user.findUnique({
            where: { userName },
        });
    },

    async create(data: {
        userName: string;
        password: string;
        role: Role;
        isActive: boolean;
    }): Promise<SafeUser> {
        return prisma.user.create({
            data,
            select: userSelect,
        });
    },

    async update(
        id: number,
        data: {
            userName?: string;
            password?: string;
            role?: Role;
            isActive?: boolean;
        }
    ): Promise<SafeUser> {
        return prisma.user.update({
            where: { id, isActive: true },
            data,
            select: userSelect,
        });
    },

    async softDelete(id: number): Promise<SafeUser> {
        return prisma.user.update({
            where: { id, isActive: true },
            data: { isActive: false },
            select: userSelect,
        });
    },
};
