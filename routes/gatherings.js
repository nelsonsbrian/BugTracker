const mongoose = require('mongoose');
const express = require('express');
const { Gathering, validate } = require('../models/gathering');
const router = express.Router();

router.get('/', async (req, res) => {
  const gatherings = await Gathering.find().sort('name');
  res.send(gatherings);
});

router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to get.');
  }

  const gathering = await Gathering.findById(req.params.id);

  if (!gathering) return res.status(404).send('The gathering with the given ID was not found');

  res.send(gathering);
});


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let gathering = new Gathering({
    name: req.body.name,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
    dateHosted: req.body.dateHosted,
  });
  gathering = await gathering.save();

  res.send(gathering);
});

router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to update.');
  }

  const gathering = await Gathering.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      dateHosted: req.body.dateHosted,
    },
    { new: true });

    if (!gathering) return res.status(404).send('The gathering with the given ID was not found');

    res.send(gathering);    
});

router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to delete.');
  }

  const gathering = await Gathering.findByIdAndDelete(req.params.id);

  if (!gathering) return res.status(404).send('The gathering with the given ID was not found');

  res.send(gathering);
});

module.exports = router;