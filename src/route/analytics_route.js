import { Router } from "express";
import { dpAnalysis } from "../controller/analytics_controller.js";
const Dp_router = Router();

// POST /api/analytics/dp -> differential privacy analysis
Dp_router.post("/analytics/dp", dpAnalysis);

export default Dp_router;
