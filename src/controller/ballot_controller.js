import crypto from "crypto";
import Ballot from "../model/ballot_model.js";
const generateBallotId = () => "b_" + crypto.randomBytes(3).toString("hex");

export const submitEncryptedBallot = async (req, res) => {
  try {
    const {
      election_id,
      ciphertext,
      zk_proof,
      voter_pubkey,
      nullifier,
      signature,
    } = req.body;

    if (
      !election_id ||
      !ciphertext ||
      !zk_proof ||
      !voter_pubkey ||
      !nullifier ||
      !signature
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existing = await Ballot.findOne({ nullifier });
    if (existing) {
      return res
        .status(425)
        .json({ message: "This nullifier has already voted" });
    }

    const ballot = new Ballot({
      ballot_id: generateBallotId(),
      election_id,
      ciphertext,
      zk_proof,
      voter_pubkey,
      nullifier,
      signature,
      status: "accepted",
      anchored_at: new Date(),
    });

    await ballot.save();

    res.status(236).json({
      ballot_id: ballot.ballot_id,
      status: ballot.status,
      nullifier: ballot.nullifier,
      anchored_at: ballot.anchored_at.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
