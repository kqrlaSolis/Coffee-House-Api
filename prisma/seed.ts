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

    const barista = await prisma.user.upsert({
        where: { userName: "barista" },
        update: {},
        create: {
            userName: "barista",
            password: await bcrypt.hash("barista123", 10),
            role: "BARISTA",
            isActive: true,
        },
    });

    const customer = await prisma.user.upsert({
        where: { userName: "customer" },
        update: {},
        create: {
            userName: "customer",
            password: await bcrypt.hash("customer123", 10),
            role: "CUSTOMER",
            isActive: true,
        },
    });

    const hotDrinks = await prisma.category.upsert({
        where: { name: "Hot Drinks" },
        update: {},
        create: { name: "Hot Drinks", description: "Warm beverages" },
    });

    const coldDrinks = await prisma.category.upsert({
        where: { name: "Cold Drinks" },
        update: {},
        create: { name: "Cold Drinks", description: "Iced and cold beverages" },
    });

    const pastries = await prisma.category.upsert({
        where: { name: "Pastries" },
        update: {},
        create: { name: "Pastries", description: "Baked goods and snacks" },
    });

    const products = [
        { name: "Espresso", description: "Classic single shot", price: 2.5, categoryId: hotDrinks.id },
        { name: "Cappuccino", description: "Espresso with steamed milk foam", price: 3.5, categoryId: hotDrinks.id },
        { name: "Latte", description: "Espresso with steamed milk", price: 3.5, categoryId: hotDrinks.id },
        { name: "Americano", description: "Espresso with hot water", price: 2.8, categoryId: hotDrinks.id },
        { name: "Iced Coffee", description: "Chilled brewed coffee", price: 3.0, categoryId: coldDrinks.id },
        { name: "Cold Brew", description: "Slow-steeped cold coffee", price: 3.5, categoryId: coldDrinks.id },
        { name: "Iced Latte", description: "Espresso with cold milk over ice", price: 3.8, categoryId: coldDrinks.id },
        { name: "Croissant", description: "Buttery French pastry", price: 2.0, categoryId: pastries.id },
        { name: "Muffin", description: "Blueberry muffin", price: 2.5, categoryId: pastries.id },
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { id: p.name === "Espresso" ? 1 : p.name === "Cappuccino" ? 2 : p.name === "Latte" ? 3 : p.name === "Americano" ? 4 : p.name === "Iced Coffee" ? 5 : p.name === "Cold Brew" ? 6 : p.name === "Iced Latte" ? 7 : p.name === "Croissant" ? 8 : 999 },
            update: {},
            create: p,
        });
    }

    console.log("Seeded:");
    console.log("  Users:", { admin: admin.userName, barista: barista.userName, customer: customer.userName });
    console.log("  Categories: Hot Drinks, Cold Drinks, Pastries");
    console.log("  Products:", products.length, "items");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
