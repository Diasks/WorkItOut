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
  const { exerciseInformation } = req.body;
  const exerciseInformationArray = exerciseInformation.map((exercise) => {
    return exercise;
  });

  const fitness = new FitnessSchedule({
    programTitle: req.body.programTitle,
    description: req.body.description,
    title: req.body.title,
    exerciseInformation: exerciseInformationArray,
  });
  
  try {
    const savedFitness = await fitness.save();
    res.json(savedFitness);
  } catch (err) {
    res.json(err);
  }
});

// @route DELETE api/fitness/:fitnessId/:exerciseId
// @desc Delete specific exercise-object in exercise-number in specific fitness-schedule
// @access Private
router.delete(
  "/:programId/exerciseNumber/:exerciseId",
  verifyToken,
  async (req, res) => {
    let programId = req.params.programId;
    let exerciseId = req.params.exerciseId;

    try {
      const deleteFitness = await FitnessSchedule.updateOne(
        {
          _id: programId,
          "exerciseInformation.exerciseNumberInformation._id": exerciseId,
        },
        {
          $pull: {
            "exerciseInformation.$.exerciseNumberInformation": {
              _id: exerciseId,
            },
          },
        },
        { multi: true }
      );

      return res.json(deleteFitness);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/fitness/:fitnessId/:exercisesId
// @desc Delete specific exercises-object in specific fitness-schedule
// @access Private
router.delete("/:programId/:exercisesId", verifyToken, async (req, res) => {
  let programId = req.params.programId;
  let exercisesId = req.params.exercisesId;

  try {
    const deleteFitness = await FitnessSchedule.findByIdAndUpdate(
      { _id: programId },
      {
        $pull: {
          exerciseInformation: { _id: exercisesId },
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
router.delete("/:programId", verifyToken, async (req, res) => {
  try {
    const removedFitness = await FitnessSchedule.deleteOne({
      _id: req.params.programId,
    });

    res.json(removedFitness);
  } catch (err) {
    res.json(err);
  }
});

// @route PATCH api/fitness/:fitnessId/exerciseNumber/:exerciseId
// @desc Update specific fitness-schedule
// @access Private
router.patch(
  "/:programId/exerciseNumber/:exerciseId",
  verifyToken,
  async (req, res) => {
    let programId = req.params.programId;
    let exerciseId = req.params.exerciseId;

    const { exerciseTitle, reps, sets, url } = req.body;
    try {
      const updatedFitness = await FitnessSchedule.updateOne(
        {
          _id: programId,
          "exerciseInformation.exerciseNumberInformation._id": exerciseId,
        },
        {
          $set: {
            "exerciseInformation.$.exerciseNumberInformation.0.exerciseTitle": exerciseTitle,
            "exerciseInformation.$.exerciseNumberInformation.0.reps": reps,
            "exerciseInformation.$.exerciseNumberInformation.0.sets": sets,
            "exerciseInformation.$.exerciseNumberInformation.0.url": url,
          },
        },
        { multi: true }
      );

      return res.json(updatedFitness);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
