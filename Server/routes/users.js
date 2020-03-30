const express = require('express');
const router = express.Router();
const User = require('../models/User');

//CRUD USER!!!

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json(err);
    }
});

/* POST user. */
router.post('/', async (req, res) => {
    const user = new User({
        surname: req.body.surname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password, 
        profilePicture: req.body.profilePicture,
        admin: req.body.admin,
        userFitnessChallenge: req.body.userFitnessChallenge
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err) {
        res.json(err);
    }
});

/* Get specific user. */
router.get('/:userId', async (req,res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch(err) {
        res.json(err);
    }
});

/* Delete specific user. */
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch(err) {
        res.json(err);
    }
});


/* Update user. */
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId }, 
            { $set: { surname: req.body.surname } });
        res.json(updatedUser);
    } catch(err) {
        res.json(err);
    }  
});

module.exports = router;
