const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// @route GET api/users
// @desc Get all users
// @access Private
router.get("/", verifyToken, async (req, res) => {
  debugger;
  try {
    const users = await User.find().select("-password").sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/users
// @desc Create new user
// @access Private
router.post(
  "/",
  [
    check("firstname", "Please add firstname").not().isEmpty(),
    check("lastname", "Please add lastname").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  verifyToken,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("E-post upptaget");

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        admin: req.body.admin,
      });

      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/users/:userId
// @desc Get specific user
// @access Private
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/users/:userId
// @desc Get specific user
// @access Private
router.delete("/:userId", verifyToken, async (req, res) => {
  try {
    const removedUser = await User.findOneAndRemove({ _id: req.params.userId });
    res.json({ removedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PATCH api/users/:userId
// @desc Update specific user
// @access Private
router.patch("/:userId", verifyToken, async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    admin,
    profilePicture,
    userFitnessChallenge,
  } = req.body;

  const userFields = {};
  userFields.user = req.body.userId;
  if (firstname) userFields.firstname = firstname;
  if (lastname) userFields.lastname = lastname;
  if (email) userFields.email = email;
  if (password) userFields.password = password;
  if (admin) userFields.admin = admin;
  if (profilePicture) userFields.profilePicture = profilePicture;
  if (userFitnessChallenge)
    userFields.userFitnessChallenge = userFitnessChallenge;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: userFields },
      { new: true }
    );
    return res.json(updatedUser);
  } catch (err) {
    debugger;
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
