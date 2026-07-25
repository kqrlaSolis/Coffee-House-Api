import { OrderRepository } from "./order.repository";
import { ProductRepository } from "../product/product.repository";
import { AppError } from "../../core/errors/AppError";
import type { PaymentMethod, OrderStatus } from "@prisma/client";

const generateTicketCode = (): string => {
    const now = new Date();
    const y = String(now.getFullYear()).slice(-2);
    const M = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const H = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    const ms = String(now.getMilliseconds()).padStart(3, "0");
    return `OC-${y}-${M}-${d}-${H}-${m}-${s}${ms}`;
};

const generateOrderNumber = (seq: number): string => {
    return `OC-${String(seq).padStart(3, "0")}`;
};

export const createOrder = async (
    userId: number,
    data: {
        paymentMethod: PaymentMethod;
        notes?: string;
        items: { productId: number; quantity: number }[];
    }
) => {
    const productIds = data.items.map((i) => i.productId);
    const products = await Promise.all(productIds.map((id) => ProductRepository.findById(id)));

    const notFound = products.findIndex((p) => !p);
    if (notFound !== -1) {
        throw new AppError(404, `Product with id ${productIds[notFound]} not found`);
    }

    const orderItems = data.items.map((item, i) => {
        const product = products[i]!;
        return {
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: Number(product.price),
        };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const total = subtotal;

    const maxSeq = await OrderRepository.findMaxOrderNumber();
    const orderNumber = generateOrderNumber(maxSeq + 1);
    const ticketCode = generateTicketCode();

    return OrderRepository.create({
        userId,
        orderNumber,
        ticketCode,
        paymentMethod: data.paymentMethod,
        subtotal,
        total,
        notes: data.notes,
        items: orderItems,
    });
};

export const getOrderByOrderNumber = (orderNumber: string, userId?: number) =>
    OrderRepository.findByOrderNumber(orderNumber, userId);

export const getPublicOrders = () => OrderRepository.findPublicOrders();

export const updateOrderStatus = async (id: number, status: OrderStatus, changedBy: string) => {
    const order = await OrderRepository.findById(id);
    if (!order) {
        throw new AppError(404, "Order not found");
    }
    return OrderRepository.updateStatus(id, status, changedBy);
};
