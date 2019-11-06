const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { User, validate } = require('../models/user');
const { Project } = require('../models/project');
const router = express.Router();

router.get('/me', async (req, res) => {
  //TODO: fix function once AUTH / Middleware logic is in...
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/', async (req, res) => {
  const user = await User.find().select('_id name role userName').sort('name');
  res.send(user);
});

router.get('/:projectId/team', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    return res.status(404).send('Invalid ID to get.');
  }
  const project = await Project.findById(req.params.projectId);
  
  if (!project) return res.status(404).send('The project with the given ID was not found');

  const team = project.team;
  if (!team.length)  {
    return res.send([]);
  }
  const user = await User.find().where('_id').in(team).select('_id name role userName').sort('name').exec();

  if (!user) return res.status(404).send('The project with the given ID was not found');

  res.send(user);
});

router.get('/:projectId/other', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
    return res.status(404).send('Invalid ID to get.');
  }
  const project = await Project.findById(req.params.projectId);
  
  if (!project) return res.status(404).send('The project with the given ID was not found');

  const team = project.team;
  if (!team.length)  {
    return res.send([]);
  }
  const user = await User.find().where('_id').nin(team).select('_id name role userName').sort('name').exec();

  if (!user) return res.status(404).send('The project with the given ID was not found');

  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'userName']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'userName']));
});

module.exports = router; 