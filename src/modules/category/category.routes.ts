import { Router } from "express";
import {
    listCategories,
    getCategory,
    newCategory,
    updatingCategory,
    removingCategory,
} from "./category.controller";
import { auth, authorize } from "../../core/middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", listCategories);
router.get("/:id", getCategory);
router.post("/", auth, authorize(Role.ADMIN), newCategory);
router.put("/:id", auth, authorize(Role.ADMIN), updatingCategory);
router.delete("/:id", auth, authorize(Role.ADMIN), removingCategory);

export default router;
