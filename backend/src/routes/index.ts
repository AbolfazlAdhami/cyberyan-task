import { Router } from "express";
import { registerController } from "../controllers/register.controller";
import { auditController } from "../controllers/audit.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(registerController));
router.get("/audit/:id", asyncHandler(auditController));

export default router;
