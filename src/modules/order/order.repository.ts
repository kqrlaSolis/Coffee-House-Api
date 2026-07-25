import { prisma } from "../../core/lib/prisma";
import type { OrderStatus, PaymentMethod } from "@prisma/client";

const orderSelect = {
    id: true,
    userId: true,
    orderNumber: true,
    ticketCode: true,
    orderStatus: true,
    paymentMethod: true,
    paymentStatus: true,
    subtotal: true,
    total: true,
    notes: true,
    createdAt: true,
    updatedAt: true,
} as const;

export const OrderRepository = {
    async findMaxOrderNumber(): Promise<number> {
        const last = await prisma.order.findFirst({
            orderBy: { id: "desc" },
            select: { orderNumber: true },
        });

        if (!last) return 0;
        const num = parseInt(last.orderNumber.replace("OC-", ""), 10);
        return isNaN(num) ? 0 : num;
    },

    async create(data: {
        userId: number;
        orderNumber: string;
        ticketCode: string;
        paymentMethod: PaymentMethod;
        subtotal: number;
        total: number;
        notes?: string;
        items: { productId: number; quantity: number; unitPrice: number }[];
    }) {
        return prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId: data.userId,
                    orderNumber: data.orderNumber,
                    ticketCode: data.ticketCode,
                    paymentMethod: data.paymentMethod,
                    subtotal: data.subtotal,
                    total: data.total,
                    notes: data.notes,
                    items: {
                        create: data.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                        })),
                    },
                    payment: {
                        create: {
                            method: data.paymentMethod,
                            amount: data.total,
                        },
                    },
                    statusHistory: {
                        create: {
                            status: "PENDING",
                            changedBy: "SYSTEM",
                        },
                    },
                },
                select: orderSelect,
            });

            return order;
        });
    },

    async findByOrderNumber(orderNumber: string, userId?: number) {
        return prisma.order.findFirst({
            where: {
                orderNumber,
                ...(userId ? { userId } : {}),
            },
            select: {
                ...orderSelect,
                items: {
                    select: {
                        id: true,
                        quantity: true,
                        unitPrice: true,
                        product: { select: { id: true, name: true, imageUrl: true } },
                    },
                },
                user: { select: { id: true, userName: true } },
            },
        });
    },

    async findPublicOrders() {
        return prisma.order.findMany({
            where: {
                orderStatus: { in: ["PENDING", "READY"] },
            },
            orderBy: { createdAt: "asc" },
            select: {
                orderNumber: true,
                orderStatus: true,
                createdAt: true,
            },
        });
    },

    async updateStatus(id: number, status: OrderStatus, changedBy: string) {
        return prisma.$transaction(async (tx) => {
            await tx.order.update({
                where: { id },
                data: { orderStatus: status },
            });

            await tx.orderStatusHistory.create({
                data: { orderId: id, status, changedBy },
            });

            return tx.order.findUnique({
                where: { id },
                select: orderSelect,
            });
        });
    },

    async findById(id: number) {
        return prisma.order.findUnique({
            where: { id },
            select: orderSelect,
        });
    },
};
