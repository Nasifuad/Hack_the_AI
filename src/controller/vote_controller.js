import Voter from "../model/voter_Schema";
import Vote from "../model/vote_model.js";
import Candidate from "../model/candidate_schema.js";
export const castVote = async (req, res) => {
  try {
    const { voter_id, candidate_id, weight } = req.body;

    // Check if voter exists
    const voter = await Voter.findOne({ voter_id });
    if (!voter) {
      return res
        .status(404)
        .json({ message: `Voter with ID ${voter_id} not found` });
    }

    // Check if voter has already voted
    if (voter.hasVoted) {
      return res
        .status(400)
        .json({ message: "Voter has already cast their vote" });
    }

    // Check if candidate exists
    const candidate = await Candidate.findOne({ candidate_id });
    if (!candidate) {
      return res
        .status(404)
        .json({ message: `Candidate with ID ${candidate_id} not found` });
    }

    // Increment candidate votes by weight (default 1)
    const voteWeight = weight || 1;
    candidate.votes += voteWeight;
    await candidate.save();

    // Create vote record
    const vote = new Vote({
      vote_id: Date.now(), // or provide custom ID
      voter_id,
      candidate_id,
      weight: voteWeight,
      timestamp: new Date(),
    });
    await vote.save();

    // Mark voter as voted
    voter.hasVoted = true;
    await voter.save();

    res.status(201).json({
      vote: {
        vote_id: vote.vote_id,
        voter_id: vote.voter_id,
        candidate_id: vote.candidate_id,
        weight: vote.weight,
        timestamp: vote.timestamp,
      },
      message: "Weighted vote cast successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getVotingResults = async (req, res) => {
  try {
    const results = await Candidate.find()
      .select("candidate_id name party votes -_id")
      .sort({ votes: -1 });

    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getWinners = async (req, res) => {
  try {
    // Find the maximum votes first
    const topCandidate = await Candidate.findOne()
      .sort({ votes: -1 })
      .select("votes");

    if (!topCandidate) {
      return res.status(404).json({ message: "No candidates found" });
    }

    const maxVotes = topCandidate.votes;

    // Find all candidates with the maximum votes (to handle ties)
    const winners = await Candidate.find({ votes: maxVotes }).select(
      "candidate_id name votes -_id"
    );

    res.status(200).json({ winners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVoteTimeline = async (req, res) => {
  try {
    const { candidate_id } = req.query;

    if (!candidate_id) {
      return res
        .status(400)
        .json({ message: "candidate_id query parameter is required" });
    }

    const votes = await Vote.find({ candidate_id: Number(candidate_id) })
      .select("vote_id timestamp -_id")
      .sort({ timestamp: 1 });

    res.status(200).json({
      candidate_id: Number(candidate_id),
      timeline: votes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
import Vote from "../models/vote_model.js";

// Get votes for a candidate within a specific time range
export const getVotesInRange = async (req, res) => {
  try {
    const { candidate_id, from, to } = req.query;

    if (!candidate_id || !from || !to) {
      return res
        .status(400)
        .json({ message: "candidate_id, from, and to are required" });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Find votes in range
    const votes = await Vote.find({
      candidate_id: Number(candidate_id),
      timestamp: { $gte: fromDate, $lte: toDate },
    }).select("weight -_id");

    const votesGained = votes.reduce(
      (sum, vote) => sum + (vote.weight || 1),
      0
    );

    res.status(200).json({
      candidate_id: Number(candidate_id),
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
      votes_gained: votesGained,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
