import { z } from "zod";
import { PaymentMethod } from "@prisma/client";

const OrderItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
});

export const CreateOrderSchema = z.object({
    paymentMethod: z.nativeEnum(PaymentMethod),
    notes: z.string().max(500).optional(),
    items: z.array(OrderItemSchema).min(1, "at least one item is required"),
});

export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderStatusSchema = z.object({
    orderStatus: z.enum(["PENDING", "READY", "DELIVERED", "CANCELLED"]),
});

export type UpdateOrderStatusDTO = z.infer<typeof UpdateOrderStatusSchema>;
