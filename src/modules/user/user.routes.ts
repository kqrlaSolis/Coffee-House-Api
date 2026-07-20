import { Router } from "express";
import { listUsers, getUser, newUser, updatingUser, removingUser } from "./user.controller";
import { auth, authorize } from "../../core/middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.post("/", auth, authorize(Role.ADMIN), newUser);
router.put("/:id", auth, authorize(Role.ADMIN, Role.BARISTA), updatingUser);
router.delete("/:id", auth, authorize(Role.ADMIN, Role.BARISTA), removingUser);

export default router;
