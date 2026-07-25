import { prisma } from "../../core/lib/prisma";

export const AuthRepository = {
    async findByUserName(userName: string) {
        return prisma.user.findUnique({
            where: { userName },
        });
    },
};
