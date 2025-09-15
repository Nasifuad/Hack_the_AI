import Candidate from "../model/candidate_schema.js";
export const registerCandidate = async (req, res) => {
  try {
    const { candidate_id, name, party } = req.body;
    const existingCandidate = await Candidate.findOne({ candidate_id });
    if (existingCandidate) {
      return res
        .status(400)
        .json({ message: `Candidate with ID ${candidate_id} already exists` });
    }

    const candidate = new Candidate({
      candidate_id,
      name,
      party,
      votes: 0,
    });

    await candidate.save();

    const { _id, __v, ...candidateData } = candidate.toObject();

    res.status(201).json({
      candidate: candidateData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    const { party } = req.query;
    let filter = {};

    if (party) {
      filter.party = party; // filter by party if provided
    }

    const candidates = await Candidate.find(filter).select("-_id -__v");

    res.status(200).json({ candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getCandidateVotes = async (req, res) => {
  try {
    const { candidate_id } = req.params;

    const candidate = await Candidate.findOne({ candidate_id }).select(
      "candidate_id votes -_id"
    );

    if (!candidate) {
      return res
        .status(404)
        .json({ message: `Candidate with ID ${candidate_id} not found` });
    }

    res.status(200).json({ candidate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const filterByParty = async (req, res) => {
  try {
    const { party } = req.query;
    let filter = {};

    if (party) {
      filter.party = party;
    }

    const candidates = await Candidate.find(filter).select("-_id -__v");

    res.status(200).json({ candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
