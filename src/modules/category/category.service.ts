import { CategoryRepository } from "./category.repository";

export const getCategories = () => CategoryRepository.findAll();

export const getCategoryById = (id: number) => CategoryRepository.findById(id);

export const createCategory = (data: { name: string; description?: string; isActive?: boolean }) =>
    CategoryRepository.create(data);

export const updateCategory = (id: number, data: { name?: string; description?: string; isActive?: boolean }) =>
    CategoryRepository.update(id, data);

export const deleteCategory = (id: number) => CategoryRepository.delete(id);
