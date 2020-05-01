const express = require("express");
const router = express.Router();
const paginate = require("jw-paginate");
const verifyToken = require("../middleware/VerifyToken");
const FaqSchedule = require("../models/faq");

// @route GET api/faq
// @desc Get all faq-schedules
// @access Public
router.get("/", async (req, res) => {
  try {
    const faq = await FaqSchedule.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    const pager = paginate(faq.length, page, pageSize);
    const pageOfFaq = faq.slice(pager.startIndex, pager.endIndex + 1);

    res.json({ faq, pager, pageOfFaq });
  } catch (err) {
    res.json(err);
  }
});

// @route POST api/faq
// @desc Create new faq-schedule
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const faq = new FaqSchedule({
    question: req.body.question,
    answer: req.body.answer,
  });
  try {
    const savedFaq = await faq.save();
    res.json(savedFaq);
  } catch (err) {
    res.json(err);
  }
});

// @route DELETE api/faq/:faqId
// @desc Delete specific faq-schedule
// @access Private
router.delete("/:faqId", verifyToken, async (req, res) => {
  try {
    const removedFaq = await FaqSchedule.deleteOne({
      _id: req.params.faqId,
    });
    res.json(removedFaq);
  } catch (err) {
    res.json(err);
  }
});

// @route PATCH api/faq/:faqId
// @desc Update specific faq-schedule
// @access Private
router.patch("/:faqId", verifyToken, async (req, res) => {
  try {
    const updatedFaq = await FaqSchedule.updateOne(
      { _id: req.params.faqId },
      {
        $set: {
          question: req.body.question,
          answer: req.body.answer,
        },
      }
    );
    res.json(updatedFaq);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
