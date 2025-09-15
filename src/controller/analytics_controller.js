import { Voter } from "../model/voter_Schema.js";
/**
 * Apply Laplace noise for differential privacy
 * @param {number} count - true count
 * @param {number} epsilon - privacy parameter
 * @returns {number} noisy count
 */
const laplaceMechanism = (count, epsilon) => {
  const u = Math.random() - 0.5;
  return Math.max(
    0,
    Math.round(
      count - (1 / epsilon) * Math.sign(u) * Math.log(1 - 2 * Math.abs(u))
    )
  );
};

export const dpAnalysis = async (req, res) => {
  try {
    const { election_id, query, epsilon, delta } = req.body;

    if (!election_id || !query || !epsilon) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    if (query.type !== "histogram") {
      return res
        .status(400)
        .json({ message: "Only histogram query supported for now" });
    }

    const { dimension, buckets, filter } = query;

    if (dimension !== "voter_age_bucket") {
      return res
        .status(400)
        .json({ message: "Currently only voter_age_bucket supported" });
    }

    const voters = await Voter.find(filter || {})
      .select("age -_id")
      .lean();

    const histogram = buckets.map((bucket) => {
      const [min, max] = bucket.split("-").map(Number);
      let count = voters.filter((v) => {
        const age = Number(v.age);
        if (bucket === "65+") return age >= 65;
        return age >= min && age <= max;
      }).length;

      return { bucket, count: noisyCount };
    });

    res.status(238).json({
      election_id,
      query,
      epsilon,
      delta,
      histogram,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
