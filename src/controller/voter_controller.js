import { Voter } from "../model/voter_Schema.js";

export const registerVoter = async (req, res) => {
  try {
    const { voter_id, name, age } = req.body;

    const existingVoter = await Voter.findOne({ voter_id });
    if (existingVoter) {
      return res.status(409).json({
        message: `Voter with id: ${existingVoter.voter_id} already exists`,
      });
    }

    const voter = new Voter({
      voter_id,
      name,
      age,
    });

    await voter.save();
    res.status(218).json({ message: "Voter registered successfully", voter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVoterById = async (req, res) => {
  try {
    const { voter_id } = req.params;
    console.log(voter_id);

    const voter = await Voter.findOne({ voter_id }).select("-_id -__v");

    if (!voter) {
      return res
        .status(417)
        .json({ message: `Voter with id: ${voter_id} not found` });
    }

    res.status(222).json({ voter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllVoters = async (req, res) => {
  try {
    const voters = await Voter.find().select("-_id -__v"); // exclude _id and __v
    res.status(223).json({ voters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateVoter = async (req, res) => {
  try {
    const { voter_id } = req.params;
    const { name, age, hasVoted } = req.body;

    if (age && parseInt(age) < 18) {
      return res
        .status(422)
        .json({ message: `Invalid age: ${age}, must be 18 or older` });
    }

    const voter = await Voter.findOneAndUpdate(
      { voter_id },
      { name, age, hasVoted },
      { new: true, runValidators: true, fields: { _id: 0, __v: 0 } }
    );

    if (!voter) {
      return res
        .status(404)
        .json({ message: `Voter with ID ${voter_id} not found` });
    }

    res.status(200).json({ message: "Voter updated successfully", voter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteVoter = async (req, res) => {
  try {
    const { voter_id } = req.params;

    const deletedVoter = await Voter.findByIdAndDelete(voter_id);

    if (!deletedVoter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    res.status(200).json({ message: `Voter with id: ${voter_id} deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting voter", error: error.message });
  }
};
