import { Router } from "express";
import {
  getAllCandidates,
  getCandidateVotes,
  registerCandidate,
} from "../controller/candidate_controller.js";
const Candidate_router = Router();

// Test route
Candidate_router.get("/", (req, res) => {
  res.send("Candidate API is working 🚀");
});
Candidate_router.get("/candidates", getAllCandidates);
Candidate_router.post("/candidates", registerCandidate);
Candidate_router.get("/candidates/:candidate_id/votes", getCandidateVotes);
export default Candidate_router;
