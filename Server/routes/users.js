const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${+new Date()}.jpg`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// @route GET api/users
// @desc Get all users
// @access Private
router.get("/", verifyToken, async (req, res) => {
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

// @route POST api/users/:userId
// @desc Post activities on specific user
// @access Private
router.post("/activities/:userId", verifyToken, async (req, res) => {
  const { date, title, time } = req.body;

  try {
    const updatedActivity = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $push: {
          activities: {
            date,
            title,
            time,
          },
        },
      },
      { new: true }
    );
    return res.json(updatedActivity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/users/activities/:userId/:activityId
// @desc Delete activity on specific user
// @access Private
router.delete(
  "/activities/:userId/:activityId",
  verifyToken,
  async (req, res) => {
    try {
      const deleteActivity = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        {
          $pull: {
            activities: { _id: req.params.activityId },
          },
        }
      );
      return res.json(deleteActivity);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/users/deleteaccount
// @desc Delete account
// @access Private
router.patch(
  "/removeaccount",
  verifyToken,
  async (req, res) => {
    debugger;

    try {
      const deleteAccount = await User.findByIdAndDelete(
        { _id: req.user.id }
      );
      debugger;
      return res.json(deleteAccount);
    } catch (err) {
      debugger;
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.patch("/password", verifyToken, async (req, res) => {
  const userExist = await User.findOne({ _id: req.user.id });

  const passwordMatch = await bcrypt.compare(
    req.body.oldPassword,
    userExist.password
  );

  if (passwordMatch) {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    return res.json(updatedUser);
  } else {
    return res.status(400).send("Det gamla lösenordet matchar inte!");
  }
});

// @route PATCH api/users/:userId
// @desc Update specific user
// @access Private
router.patch(
  "/:userId",
  upload.single("profilePicture"),
  verifyToken,
  async (req, res) => {
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
    if (userFitnessChallenge)
      userFields.userFitnessChallenge = userFitnessChallenge;
    if (req.file) {
      const img = fs.readFileSync(req.file.path);
      const encodeImg = img.toString("base64");

      const finalImg = {
        contentType: req.file.mimetype,
        path: req.file.path,
        image: new Buffer.from(encodeImg, "base64"),
      };

      userFields.profilePicture = finalImg;
    } else if (profilePicture === "") {
      userFields.profilePicture = "";
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: userFields },
        { new: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
