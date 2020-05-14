const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const FitnessSchedule = require("../models/Fitness");

// @route GET api/fitness
// @desc Get all fitness-schedules
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const fitness = await FitnessSchedule.find();
    res.json(fitness);
  } catch (err) {
    res.json(err);
  }
});

// @route GET api/fitness/:fitnessId
// @desc Get specific fitness-schedule
// @access Private
router.get("/:fitnessId", verifyToken, async (req, res) => {
  try {
    const fitness = await FitnessSchedule.findById(req.params.fitnessId);
    res.json(fitness);
  } catch (err) {
    res.json(err);
  }
});

// @route POST api/fitness
// @desc Create new fitness-schedule
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const fitness = new FitnessSchedule({
    programTitle: req.body.fitness.programTitle,
    description: req.body.fitness.description,
    length: req.body.fitness.length,
    title: req.body.fitness.title,
    exerciseInformation: req.body.exerciseObject,
  });
  try {
    const savedFitness = await fitness.save();
    res.json(savedFitness);
  } catch (err) {
    res.json(err);
  }
});

// @route DELETE api/fitness/:fitnessId/:exerciseId
// @desc Delete specific exercise-object in specific fitness-schedule
// @access Private
router.delete("/:fitnessId/:exerciseId", verifyToken, async (req, res) => {
  let programId = req.params.fitnessId;
  let exerciseId = req.params.exerciseId;

  try {
    const deleteFitness = await FitnessSchedule.findByIdAndUpdate(
      { _id: programId },
      {
        $pull: {
          exerciseInformation: { _id: exerciseId },
        },
      },
      { new: true }
    );

    return res.json(deleteFitness);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/fitness/:fitnessId
// @desc Delete specific fitness-schedule
// @access Private
router.delete("/:fitnessId", verifyToken, async (req, res) => {
  try {
    const removedFitness = await FitnessSchedule.deleteOne({
      _id: req.params.fitnessId,
    });

    res.json(removedFitness);
  } catch (err) {
    res.json(err);
  }
});

// @route PATCH api/fitness/:fitnessId
// @desc Update specific fitness-schedule
// @access Private
router.patch("/:fitnessId", verifyToken, async (req, res) => {
  let programId = req.body.programId;
  let exerciseId = req.body.exerciseId;

  try {
    const updatedFitness = await FitnessSchedule.findOneAndUpdate(
      { _id: programId, "exerciseInformation._id": exerciseId },
      {
        $set: {
          "exerciseInformation.$.exerciseTitle": req.body.exerciseTitle,
          "exerciseInformation.$.reps": req.body.reps,
          "exerciseInformation.$.sets": req.body.sets,
          "exerciseInformation.$.url": req.body.url,
        },
      },
      { new: true }
    );

    return res.json(updatedFitness);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
