import { Router } from "express";
import { dpAnalysis } from "../controller/analytics_controller.js";
const Dp_router = Router();

Dp_router.post("/analytics/dp", dpAnalysis);

export default Dp_router;
