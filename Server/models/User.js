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

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
  },
  profilePicture: {
    type: Object,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userFitnessChallenge: [FitnessSchema],
  activities: [
    {
      date: Date,
      title: String,
      time: Number,
    },
  ],
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
