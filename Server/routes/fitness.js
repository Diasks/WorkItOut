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
    title: req.body.title,
    bodyPartName: req.body.bodyPartName,
    exerciseInformation: req.body.exerciseInformation,
  });
  try {
    const savedFitness = await fitness.save();
    res.json(savedFitness);
  } catch (err) {
    res.json(err);
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
  try {
    const updatedFitness = await FitnessSchedule.updateOne(
      { _id: req.params.fitnessId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedFitness);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
