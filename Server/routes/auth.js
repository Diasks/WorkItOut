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

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email });
    if (user == null) return res.status(400).send('Cannot find user!');
    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) return res.status(400).send("Invalid password");
    
    try {
        const accessToken =  jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1h" });
        return res.status(200).send({ accessToken: accessToken });    
    } catch(err) {
        res.status(400).send(err)
    }
});  



module.exports = router;