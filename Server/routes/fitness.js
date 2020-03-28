const express = require('express');
const router = express.Router();
const FitnessSchedule = require('../models/Fitness');

/* GET all fitness-schedules. */
router.get('/', async (req, res) => {
    try {
        const fitness = await FitnessSchedule.find();
        res.json(fitness);
    } catch(err) {
        res.json(err);
    }
});

/* GET specific fitness-schedule. */
router.get('/:fitnessId', async (req,res) => {
    try {
        const fitness = await FitnessSchedule.findById(req.params.fitnessId);
        res.json(fitness);
    } catch(err) {
        res.json(err);
    }
});

/* POST new fitness-schedule. */
router.post('/', async (req, res) => {
    const fitness = new FitnessSchedule({
        title: req.body.title,
        bodyPartName:  req.body.bodyPartName,
        exerciseInformation: req.body.exerciseInformation  
    });
    try {
        const savedFitness = await fitness.save();
        res.json(savedFitness);
    } catch(err) {
        res.json(err);
    }
});

/* Delete specific fitness-schedule. */
router.delete('/:fitnessId', async (req, res) => {
    try {
        const removedFitness = await FitnessSchedule.deleteOne({ _id: req.params.fitnessId });
        res.json(removedFitness);
    } catch(err) {
        res.json(err);
    }
});

/* Update specific fitness-schedule. */
router.patch('/:fitnessId', async (req, res) => {
    try {
        const updatedFitness = await FitnessSchedule.updateOne(
            { _id: req.params.fitnessId }, 
            { $set: { title: req.body.title } });
        res.json(updatedFitness);
    } catch (err) {
        res.json(err);
    }  
});

module.exports = router;