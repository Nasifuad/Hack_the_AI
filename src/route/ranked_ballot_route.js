import { Router } from "express";
import { submitRankedBallot } from "../controller/ranked_ballot_controller.js";

const router = Router();

router.post("/ballots/ranked", submitRankedBallot);

export default router;
