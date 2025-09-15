import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  candidate_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  party: {
    type: String,
    required: true,
    trim: true,
  },
  votes: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
