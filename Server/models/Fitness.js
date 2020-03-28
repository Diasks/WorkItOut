const mongoose = require('mongoose');
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
    }
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
    exerciseInformation:  [exerciseInformationSchema]
});



const FitnessSchedule = mongoose.model('fitness', FitnessSchema);

module.exports = FitnessSchedule;


