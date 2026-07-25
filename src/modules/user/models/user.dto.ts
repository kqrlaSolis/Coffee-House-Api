import { z } from "zod";
import { Role } from "@prisma/client";

export { Role };

export const CreateUserSchema = z.object({
    userName: z.string().min(1, "userName is required").max(50),
    password: z.string().min(6, "password must be at least 6 characters").max(100),
    role: z.nativeEnum(Role).default(Role.CUSTOMER),
    isActive: z.boolean().default(true),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    userName: z.string().min(1, "userName is required").max(50),
    password: z.string().min(6, "password must be at least 6 characters").max(100).optional(),
    role: z.nativeEnum(Role),
    isActive: z.boolean(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
