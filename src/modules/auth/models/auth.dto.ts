import { z } from "zod";

export const LoginSchema = z.object({
    userName: z.string().min(1, "userName is required").max(50),
    password: z.string().min(1, "password is required").max(100),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
    userName: z.string().min(1, "userName is required").max(50),
    password: z.string().min(6, "password must be at least 6 characters").max(100),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;
