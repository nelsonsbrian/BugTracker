const mongoose = require('mongoose');
const express = require('express');
const { Meal, validate } = require('../models/meal');
const { Gathering } = require('../models/gathering');
const router = express.Router();

router.get('/:gathId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.gathId)) {
    return res.status(404).send('Invalid ID to get.');
  }

  const meals = await Gathering.findById(req.params.gathId).select('meals');
  if (!meals) return res.status(404).send('The gathering with the given ID was not found');

  res.send(meals);
});

router.post('/:gathId', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.gathId)) {
    return res.status(404).send('Invalid gatherer ID to create a comment.');
  }

  let meal = new Meal({
    name: req.body.name,
    notes: req.body.notes,
  });

  const gathering = await Gathering.findByIdAndUpdate(req.params.gathId,
    {
      $push: { meals: meal }
    },
    { new: true }
  );

  if (!gathering) return res.status(404).send('The gathering with the given ID was not found');

  res.send(gathering);
});

module.exports = router;  