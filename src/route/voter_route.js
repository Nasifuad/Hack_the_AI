import { Router } from "express";
import {
  registerVoter,
  getVoterById,
  getAllVoters,
  updateVoter,
  deleteVoter,
} from "../controller/voter_controller.js";
const router = Router();

router.route("/").get((req, res) => {
  res.send("hello");
});

router.post("/voters", registerVoter);
router.put("/:voter_id", updateVoter);
router.get("/voters/:voter_id", getVoterById);
router.get("/voters", getAllVoters);
router.delete("/voters/:voter_id", deleteVoter);

const Voter_router = router;
export default Voter_router;
