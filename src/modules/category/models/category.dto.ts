import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string().min(1, "name is required").max(100),
    description: z.string().max(500).optional(),
    isActive: z.boolean().default(true),
});

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
    name: z.string().min(1, "name is required").max(100),
    description: z.string().max(500).optional(),
    isActive: z.boolean(),
});

export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;
