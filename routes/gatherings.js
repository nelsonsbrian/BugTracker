const mongoose = require('mongoose');
const express = require('express');
const {Gathering, validate} = require('../models/gathering');
const router = express.Router();

router.get('/', async(req, res) => {
  const gatherings = await Gathering.find().sort('name');
  res.send(gatherings);
});

router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let gathering = new Gathering( {
    name: req.body.name,
    description: req.body.description,
    dateCreated:  req.body.dateCreated,
    dateHosted:  req.body.dateHosted,
    meals:  req.body.meals,
    attendance:  req.body.attendance,
    comments:  req.body.comments
  });
  gathering = await gathering.save();
  
  res.send(gathering);
});

module.exports = router;