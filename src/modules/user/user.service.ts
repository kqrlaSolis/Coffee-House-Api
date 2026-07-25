import { UserRepository, type SafeUser } from "./user.repository";
import { hashPassword } from "../../core/utils/security";
import type { Role } from "@prisma/client";

export const getUsers = async (): Promise<SafeUser[]> => {
    return UserRepository.findAll();
};

export const getUserById = async (id: number): Promise<SafeUser | null> => {
    return UserRepository.findById(id);
};

export const createUser = async (data: {
    userName: string;
    password: string;
    role: Role;
    isActive: boolean;
}): Promise<SafeUser> => {
    const hashedPassword = await hashPassword(data.password);
    return UserRepository.create({
        userName: data.userName,
        password: hashedPassword,
        role: data.role,
        isActive: data.isActive,
    });
};

export const updateUser = async (
    id: number,
    data: {
        userName: string;
        password?: string;
        role: Role;
        isActive: boolean;
    }
): Promise<SafeUser> => {
    const updateData: {
        userName: string;
        role: Role;
        isActive: boolean;
        password?: string;
    } = {
        userName: data.userName,
        role: data.role,
        isActive: data.isActive,
    };

    if (data.password) {
        updateData.password = await hashPassword(data.password);
    }

    return UserRepository.update(id, updateData);
};

export const deleteUser = async (id: number): Promise<SafeUser> => {
    return UserRepository.softDelete(id);
};
