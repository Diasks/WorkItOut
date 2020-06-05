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

// @route DELETE api/fitness/:programId/exerciseNumber/:exerciseId
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

// @route DELETE api/fitness/:programId/:exercisesId
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

// @route DELETE api/fitness/:programId
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

// @route PATCH api/fitness/:programId/exerciseNumber/:exerciseId
// @desc Update specific fitness-schedule
// @access Private
router.patch(
  "/:programId/exerciseNumber/:exerciseId",
  verifyToken,
  async (req, res) => {
    let programId = req.params.programId;
    let exerciseId = req.params.exerciseId;
    let i;

    const {
      exerciseTitle,
      reps,
      sets,
      url,
      exerciseNumberInformation,
    } = req.body;

    exerciseNumberInformation.map((key, value) => {
      return (i = value);
    });

    try {
      const updatedFitness = await FitnessSchedule.updateOne(
        {
          _id: programId,
          "exerciseInformation.exerciseNumberInformation._id": exerciseId,
        },
        {
          $set: {
            "exerciseInformation.$.exerciseNumberInformation.$[i].exerciseTitle": exerciseTitle,
            "exerciseInformation.$.exerciseNumberInformation.$[i].reps": reps,
            "exerciseInformation.$.exerciseNumberInformation.$[i].sets": sets,
            "exerciseInformation.$.exerciseNumberInformation.$[i].url": url,
          },
        },
        {
          multi: true,
          arrayFilters: [{ "i._id": exerciseId }],
        }
      );

      return res.json(updatedFitness);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
