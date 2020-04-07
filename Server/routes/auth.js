const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route POST api/auth/register
// @desc Register a new user
// @access Public
router.post(
  "/register",
  [
    check("firstname", "Please add surname").not().isEmpty(),
    check("lastname", "Please add lastname").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });

      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user == null) return res.status(400).send("Cannot find user");
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) return res.status(400).send("Invalid password");

    try {
      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "3600",
      });
      return res.status(200).send({ accessToken: accessToken });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = router;
