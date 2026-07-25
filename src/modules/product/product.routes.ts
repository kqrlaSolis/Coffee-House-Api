import { Router } from "express";
import {
    listProducts,
    getProduct,
    newProduct,
    updatingProduct,
    removingProduct,
} from "./product.controller";
import { auth, authorize } from "../../core/middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", auth, authorize(Role.ADMIN), newProduct);
router.put("/:id", auth, authorize(Role.ADMIN), updatingProduct);
router.delete("/:id", auth, authorize(Role.ADMIN), removingProduct);

export default router;
