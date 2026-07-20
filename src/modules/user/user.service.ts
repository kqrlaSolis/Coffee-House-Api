import { prisma } from "../../core/lib/prisma";
import type { User } from "@prisma/client";
import { hashPassword } from "../../core/utils/security";


export const getUsers = async (): Promise<Omit<User, 'password'>[]> => {
    return prisma.user.findMany({
        where: {
            isActive: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            userName: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
        },
    });
};

export const getUserById = async (id: number): Promise<Omit<User, 'password'> | null> => {
    return prisma.user.findUnique({
        where: {
            id,
            isActive: true,
        },
        select: {
            id: true,
            userName: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
        },
    });
};

export const createUser = async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Omit<User, 'password'>> => {
    const hashedPassword = await hashPassword(user.password);
    return prisma.user.create({
        data: {
            userName: user.userName,
            password: hashedPassword,
            role: user.role,
            isActive: user.isActive,
        },
        select: {
            id: true,
            userName: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
        },
    });
};

export const updateUser = async (id: number, user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Omit<User, 'password'>> => {
    const hashedPassword = await hashPassword(user.password);
    return prisma.user.update({
        where: {
            id,
            isActive: true,
        },
        data: {
            userName: user.userName,
            password: hashedPassword,
            role: user.role,
            isActive: user.isActive,
        },
        select: {
            id: true,
            userName: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
        },
    });
};

//logic delete
export const deleteUser = async (id: number): Promise<Omit<User, 'password'>> => {
    return prisma.user.update({
        where: {
            id,
            isActive: true,
        },
        data: {
            isActive: false,
        },
        select: {
            id: true,
            userName: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
        },
    });
};