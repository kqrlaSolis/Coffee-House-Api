import * as categoryService from "./category.service";
import type { Request, Response } from "express";
import { CreateCategorySchema, UpdateCategorySchema } from "./models/category.dto";
import { AppError } from "../../core/errors/AppError";

export const listCategories = async (_req: Request, res: Response) => {
    const categories = await categoryService.getCategories();
    res.json(categories);
};

export const getCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid category ID");

    const category = await categoryService.getCategoryById(id);
    if (!category) throw new AppError(404, "Category not found");

    res.json(category);
};

export const newCategory = async (req: Request, res: Response) => {
    const result = CreateCategorySchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const category = await categoryService.createCategory(result.data);
    res.status(201).json(category);
};

export const updatingCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid category ID");

    const result = UpdateCategorySchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const category = await categoryService.updateCategory(id, result.data);
    res.json(category);
};

export const removingCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid category ID");

    const category = await categoryService.deleteCategory(id);
    res.json(category);
};
