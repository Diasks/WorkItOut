const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

const FaqSchedule = mongoose.model("faq", FaqSchema);

module.exports = FaqSchedule;
