import { ProductRepository } from "./product.repository";

export const getProducts = (categoryId?: number) => ProductRepository.findAll(categoryId);

export const getProductById = (id: number) => ProductRepository.findById(id);

export const createProduct = (data: {
    categoryId: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    isActive?: boolean;
}) => ProductRepository.create(data);

export const updateProduct = (
    id: number,
    data: {
        categoryId?: number;
        name?: string;
        description?: string;
        price?: number;
        imageUrl?: string;
        isActive?: boolean;
    }
) => ProductRepository.update(id, data);

export const deleteProduct = (id: number) => ProductRepository.delete(id);
