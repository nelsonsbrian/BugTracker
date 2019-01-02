const mongoose = require('mongoose');
const express = require('express');
const {Gathering, validate} = require('../models/gathering');
const router = express.Router();

router.get('/', async(req, res) => {
  const gatherings = await Gathering.find().sort('name');
  res.send(gatherings);
});