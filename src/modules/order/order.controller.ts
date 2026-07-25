import * as orderService from "./order.service";
import type { Request, Response } from "express";
import { CreateOrderSchema, UpdateOrderStatusSchema } from "./models/order.dto";
import { AppError } from "../../core/errors/AppError";
import QRCode from "qrcode";

export const newOrder = async (req: Request, res: Response) => {
    const result = CreateOrderSchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const userId = req.user!.id;
    const order = await orderService.createOrder(userId, result.data);
    res.status(201).json(order);
};

export const getMyOrder = async (req: Request, res: Response) => {
    const orderNumber = String(req.params.orderNumber);
    const userId = req.user!.id;

    const order = await orderService.getOrderByOrderNumber(orderNumber, userId);
    if (!order) throw new AppError(404, "Order not found");

    res.json(order);
};

export const listPublicOrders = async (_req: Request, res: Response) => {
    const orders = await orderService.getPublicOrders();
    res.json(orders);
};

export const changingOrderStatus = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError(400, "Invalid order ID");

    const result = UpdateOrderStatusSchema.safeParse(req.body);
    if (!result.success) {
        throw new AppError(400, "Validation failed", result.error.flatten().fieldErrors);
    }

    const changedBy = req.user!.userName;
    const order = await orderService.updateOrderStatus(id, result.data.orderStatus, changedBy);
    res.json(order);
};

export const getOrderQR = async (req: Request, res: Response) => {
    const orderNumber = String(req.params.orderNumber);
    const userId = req.user!.id;

    const order = await orderService.getOrderByOrderNumber(orderNumber, userId);
    if (!order) throw new AppError(404, "Order not found");

    const qrDataUrl = await QRCode.toDataURL(order.ticketCode, {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
    });

    res.json({ orderNumber: order.orderNumber, qr: qrDataUrl });
};
