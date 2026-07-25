import * as productService from "./product.service";
import type { Request, Response } from "express";
import { CreateProductSchema, UpdateProductSchema } from "./models/product.dto";
import { AppError } from "../../core/errors/AppError";

export const listProducts = async (req: Request, res: Response) => {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    const products = await productService.getProducts(categoryId);
    res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid product ID");

    const product = await productService.getProductById(id);
    if (!product) throw new AppError(404, "Product not found");

    res.json(product);
};

export const newProduct = async (req: Request, res: Response) => {
    const result = CreateProductSchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const product = await productService.createProduct(result.data);
    res.status(201).json(product);
};

export const updatingProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid product ID");

    const result = UpdateProductSchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const product = await productService.updateProduct(id, result.data);
    res.json(product);
};

export const removingProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid product ID");

    const product = await productService.deleteProduct(id);
    res.json(product);
};
