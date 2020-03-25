const mongoose = require('mongoose');

const userTrainingSchema = new Schema({
    title: String, 
    bodyPartName:  String,
    exerciseInformation:  [exerciseInformationSchema]
});

const exerciseInformationSchema = new Schema({
    title: String,
    sets: Number,
    reps: String
});

const UserSchema = mongoose.Schema({
    surname: {
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
        max:255
    }, 
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean
    },
    userTraining: [userTrainingSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;


