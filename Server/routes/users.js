const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const User = require("../models/User");

// @route GET api/users
// @desc Get all users
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

// @route POST api/users
// @desc Create new user
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture,
    admin: req.body.admin,
    userFitnessChallenge: req.body.userFitnessChallenge,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json(err);
  }
});

// @route GET api/users/:userId
// @desc Get specific user
// @access Private
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// @route GET api/users/:userId
// @desc Get specific user
// @access Private
router.delete("/:userId", verifyToken, async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json(err);
  }
});

// @route PATCH api/users/:userId
// @desc Update specific user
// @access Private
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { firstname: req.body.firstname } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
