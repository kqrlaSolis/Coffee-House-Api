import { z } from "zod";

export const CreateProductSchema = z.object({
    categoryId: z.number().int().positive("categoryId is required"),
    name: z.string().min(1, "name is required").max(100),
    description: z.string().max(500).optional(),
    price: z.number().positive("price must be positive"),
    imageUrl: z.string().url().optional(),
    isActive: z.boolean().default(true),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = z.object({
    categoryId: z.number().int().positive().optional(),
    name: z.string().min(1, "name is required").max(100).optional(),
    description: z.string().max(500).optional(),
    price: z.number().positive("price must be positive").optional(),
    imageUrl: z.string().url().optional(),
    isActive: z.boolean().optional(),
});

export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;
