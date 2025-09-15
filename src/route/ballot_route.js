import { Router } from "express";
import { submitEncryptedBallot } from "../controller/ballot_controller.js";
const ballot_Router = Router();

ballot_Router.post("/ballots/encrypted", submitEncryptedBallot);

export default ballot_Router;
