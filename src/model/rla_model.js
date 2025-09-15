import mongoose from "mongoose";

const rlaSchema = new mongoose.Schema(
  {
    audit_id: { type: String, required: true, unique: true },
    election_id: { type: String, required: true },
    reported_tallies: { type: Array, required: true },
    risk_limit_alpha: { type: Number, required: true },
    audit_type: { type: String, required: true },
    stratification: { type: Object, required: true },
    initial_sample_size: { type: Number, required: true },
    sampling_plan: { type: String, required: true }, // base64 CSV or JSON
    test: { type: String, required: true },
    status: { type: String, default: "planned" },
  },
  { timestamps: true }
);

const RLA = mongoose.model("RLA", rlaSchema);
export default RLA;
