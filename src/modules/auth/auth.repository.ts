import { prisma } from "../../core/lib/prisma";

export const AuthRepository = {
    async findByUserName(userName: string) {
        return prisma.user.findUnique({
            where: { userName },
        });
    },

    async create(data: { userName: string; password: string }) {
        return prisma.user.create({
            data: {
                ...data,
                role: "CUSTOMER",
            },
        });
    },
};
