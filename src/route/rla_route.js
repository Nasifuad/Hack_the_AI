import { Router } from "express";
import { planAudit } from "../controller/rla_controller.js";

const router = Router();

router.post("/audits/plan", planAudit);

export default router;
