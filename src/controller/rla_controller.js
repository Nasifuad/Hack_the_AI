import RLA from "../models/rla_model.js";
import crypto from "crypto";

const generateAuditId = () => "rla_" + crypto.randomBytes(2).toString("hex");

export const planAudit = async (req, res) => {
  try {
    const {
      election_id,
      reported_tallies,
      risk_limit_alpha,
      audit_type,
      stratification,
    } = req.body;

    if (
      !election_id ||
      !reported_tallies ||
      !risk_limit_alpha ||
      !audit_type ||
      !stratification
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const initialSampleSize = 1200;

    const samplingPlanCSV =
      "county,seed,sample_size\nA,1234,400\nB,5678,400\nC,9101,400";
    const samplingPlanBase64 = Buffer.from(samplingPlanCSV).toString("base64");

    const rla = new RLA({
      audit_id: generateAuditId(),
      election_id,
      reported_tallies,
      risk_limit_alpha,
      audit_type,
      stratification,
      initial_sample_size: initialSampleSize,
      sampling_plan: samplingPlanBase64,
      test: "kaplan-markov",
      status: "planned",
    });

    await rla.save();

    res.status(201).json({
      audit_id: rla.audit_id,
      initial_sample_size: rla.initial_sample_size,
      sampling_plan: rla.sampling_plan,
      test: rla.test,
      status: rla.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
