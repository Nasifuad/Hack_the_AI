import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    vote_id: {
      type: Number,
      required: true,
      unique: true,
    },
    voter_id: {
      type: Number,
      required: true,
      ref: "Voter",
    },
    candidate_id: {
      type: Number,
      required: true,
      ref: "Candidate",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Voter = mongoose.model("Voter", voterSchema);

export { Voter };
