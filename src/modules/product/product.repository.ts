import { prisma } from "../../core/lib/prisma";

export const ProductRepository = {
    async findAll(categoryId?: number) {
        return prisma.product.findMany({
            where: {
                isActive: true,
                ...(categoryId ? { categoryId } : {}),
            },
            orderBy: { name: "asc" },
            include: { category: { select: { id: true, name: true } } },
        });
    },

    async findById(id: number) {
        return prisma.product.findUnique({
            where: { id, isActive: true },
            include: { category: { select: { id: true, name: true } } },
        });
    },

    async create(data: {
        categoryId: number;
        name: string;
        description?: string;
        price: number;
        imageUrl?: string;
        isActive?: boolean;
    }) {
        return prisma.product.create({
            data,
            include: { category: { select: { id: true, name: true } } },
        });
    },

    async update(
        id: number,
        data: {
            categoryId?: number;
            name?: string;
            description?: string;
            price?: number;
            imageUrl?: string;
            isActive?: boolean;
        }
    ) {
        return prisma.product.update({
            where: { id },
            data,
            include: { category: { select: { id: true, name: true } } },
        });
    },

    async delete(id: number) {
        return prisma.product.update({
            where: { id },
            data: { isActive: false },
        });
    },
};
