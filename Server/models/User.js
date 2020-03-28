const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    userFitnessChallenge: []
});

const User = mongoose.model('user', UserSchema);

module.exports = User;


