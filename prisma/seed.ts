import { prisma } from "../src/core/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const password = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { userName: "admin" },
        update: {},
        create: {
            userName: "admin",
            password,
            role: "ADMIN",
            isActive: true,
        },
    });

    console.log("Seeded admin user:", { id: admin.id, userName: admin.userName, role: admin.role });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
