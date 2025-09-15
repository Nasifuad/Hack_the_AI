import { Router } from "express";
import {
  castVote,
  getVotesInRange,
  getVoteTimeline,
  getVotingResults,
  getWinners,
} from "../controller/vote_controller.js";

const vote_Router = Router();

vote_Router.post("/votes", castVote);
vote_Router.get("/results", getVotingResults);
vote_Router.get("/results/winner", getWinners);
vote_Router.get("/votes/timeline", getVoteTimeline);
vote_Router.get("/votes/range", getVotesInRange);

export default vote_Router;
