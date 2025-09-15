import mongoose from "mongoose";

const ballotSchema = new mongoose.Schema(
  {
    ballot_id: { type: String, required: true, unique: true },
    election_id: { type: String, required: true },
    ciphertext: { type: String, required: true },
    zk_proof: { type: String, required: true },
    voter_pubkey: { type: String, required: true },
    nullifier: { type: String, required: true, unique: true },
    signature: { type: String, required: true },
    status: { type: String, default: "pending" },
    anchored_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Ballot = mongoose.model("Ballot", ballotSchema);

export default Ballot;
