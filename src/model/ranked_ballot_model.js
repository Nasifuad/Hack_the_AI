import mongoose from "mongoose";

const rankedBallotSchema = new mongoose.Schema(
  {
    ballot_id: { type: String, required: true, unique: true },
    election_id: { type: String, required: true },
    voter_id: { type: Number, required: true },
    ranking: { type: [Number], required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const RankedBallot = mongoose.model("RankedBallot", rankedBallotSchema);
export default RankedBallot;
