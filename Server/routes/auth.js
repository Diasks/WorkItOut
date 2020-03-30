const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//AUTH FOR USERS, REGISTER LOGIN & LOGOUT!!!

router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
        surname: req.body.surname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
      });

        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err) {
        res.json(err);
    }
});

module.exports = router;