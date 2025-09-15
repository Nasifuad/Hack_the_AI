import { Router } from "express";
import { homomorphicTally } from "../controller/homomorphic_controller.js";

const Homo_router = Router();

Homo_router.post("/results/homomorphic", homomorphicTally);

export default Homo_router;
