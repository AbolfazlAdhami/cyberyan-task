import { Router } from "express";
import { registerController } from "../controllers/register.controller";
import { authController } from "../controllers/auth.controller";
import { auditController } from "../controllers/audit.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", asyncHandler(registerController));
router.post("/auth", asyncHandler(authController));
router.get("/audit/:id", verifyToken, asyncHandler(auditController));

export default router;
