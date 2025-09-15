import RankedBallot from "../models/ranked_ballot_model.js";
import crypto from "crypto";

const generateRankedBallotId = () =>
  "rb_" + crypto.randomBytes(3).toString("hex");

export const submitRankedBallot = async (req, res) => {
  try {
    const { election_id, voter_id, ranking, timestamp } = req.body;

    if (!election_id || !voter_id || !ranking || !Array.isArray(ranking)) {
      return res
        .status(400)
        .json({ message: "Missing required fields or invalid ranking" });
    }

    const existing = await RankedBallot.findOne({ election_id, voter_id });
    if (existing) {
      return res.status(400).json({
        message:
          "Voter has already submitted a ranked ballot for this election",
      });
    }

    const ballot = new RankedBallot({
      ballot_id: generateRankedBallotId(),
      election_id,
      voter_id,
      ranking,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      status: "accepted",
    });

    await ballot.save();

    res.status(201).json({
      ballot_id: ballot.ballot_id,
      status: ballot.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
