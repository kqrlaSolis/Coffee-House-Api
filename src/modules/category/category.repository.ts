import { prisma } from "../../core/lib/prisma";

export const CategoryRepository = {
    async findAll() {
        return prisma.category.findMany({
            where: { isActive: true },
            orderBy: { name: "asc" },
            include: { _count: { select: { products: true } } },
        });
    },

    async findById(id: number) {
        return prisma.category.findUnique({
            where: { id, isActive: true },
            include: { products: { where: { isActive: true } } },
        });
    },

    async create(data: { name: string; description?: string; isActive?: boolean }) {
        return prisma.category.create({ data });
    },

    async update(id: number, data: { name?: string; description?: string; isActive?: boolean }) {
        return prisma.category.update({
            where: { id },
            data,
        });
    },

    async delete(id: number) {
        return prisma.category.update({
            where: { id },
            data: { isActive: false },
        });
    },
};
