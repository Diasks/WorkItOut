<<<<<<< HEAD
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseInformationSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
});

const FitnessSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  bodyPartName: {
    type: String,
    required: true,
    trim: true,
  },
  exerciseInformation: [exerciseInformationSchema],
});

const FitnessSchedule = mongoose.model("fitness", FitnessSchema);

module.exports = FitnessSchedule;
=======
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseInformationSchema = new Schema({
  exerciseTitle: {
    type: String,
    required: true,
    trim: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
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
  length: {
    type: Number,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  exerciseInformation: [exerciseInformationSchema],
});

const FitnessSchedule = mongoose.model("fitness", FitnessSchema);

module.exports = FitnessSchedule;
>>>>>>> 2b7379a0f56dd95177979a9b2a1de867a76bdf40
