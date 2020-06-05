const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseNumberInformationSchema = new Schema({
  exerciseTitle: {
    type: String,
    trim: true,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
});

const FitnessSchema = new Schema({
  programTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  exerciseInformation: [
    {
      exerciseNumber: Number,
      exercisePassed: Boolean,
      exerciseNumberInformation: [exerciseNumberInformationSchema],
    },
  ],
});

const FitnessSchedule = mongoose.model("fitness", FitnessSchema);

module.exports = FitnessSchedule;
