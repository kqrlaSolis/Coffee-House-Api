import { Role } from "@prisma/client";

export { Role };

export interface UserDTO {
    id: number,
    userName: string,
    role: Role,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
}

export interface CreateUserDTO {
    userName: string,
    password: string,
    role: Role,
    isActive: boolean,
}

export interface UpdateUserDTO {
    userName: string,
    password?: string,
    role: Role,
    isActive: boolean,
}
