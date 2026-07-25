import { Router } from "express";
import {
    newOrder,
    getMyOrder,
    listPublicOrders,
    changingOrderStatus,
    getOrderQR,
} from "./order.controller";
import { auth, authorize } from "../../core/middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/public", listPublicOrders);
router.post("/", auth, authorize(Role.CUSTOMER, Role.ADMIN, Role.BARISTA), newOrder);
router.get("/:orderNumber", auth, getMyOrder);
router.get("/:orderNumber/qr", auth, getOrderQR);
router.patch("/:id/status", auth, authorize(Role.BARISTA, Role.ADMIN), changingOrderStatus);

export default router;
