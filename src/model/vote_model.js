import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    vote_id: { type: Number, required: true, unique: true },
    voter_id: { type: Number, required: true, ref: "Voter" },
    candidate_id: { type: Number, required: true, ref: "Candidate" },
    weight: { type: Number, default: 1 }, // default weight is 1
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
