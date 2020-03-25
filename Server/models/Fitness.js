const mongoose = require('mongoose');

const FitnessSchema = mongoose.Schema({
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
    exerciseInformation:  [exerciseInformationSchema]
});

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
    }
});

const Fitness = mongoose.model('fitness', FitnessSchema);

module.exports = Fitness;