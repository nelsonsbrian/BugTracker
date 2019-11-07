const mongoose = require('mongoose');
const express = require('express');
const { Project, validate } = require('../models/project');
const { Issue } = require('../models/issue');
const router = express.Router();
const _ = require('lodash');

router.get('/', async (req, res) => {
  const projects = await Project.find().sort('name');
  res.send(projects);
  console.log('request')
  // res.send("woo");
});

router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to get.');
  }

  const project = await Project.findById(req.params.id);

  if (!project) return res.status(404).send('The project with the given ID was not found');

  res.send(project);
});


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let project = new Project({
    name: req.body.name,
    description: req.body.description,
  });
  project = await project.save();
  res.send(project);
});

router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to update.');
  }

  const project = await Project.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      dateHosted: req.body.dateHosted,
    },
    { new: true });

  if (!project) return res.status(404).send('The project with the given ID was not found');

  res.send(project);
});

router.post('/:id/user/add', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to update.');
  }
  // TODO:  Check to see if user is on team already....
  const project = await Project.findByIdAndUpdate(req.params.id,
    {
      $push: { team: req.body.addUser },
    },
    { new: true });

  if (!project) return res.status(404).send('The project with the given ID was not found');

  res.send(project);
});

router.put('/:id/user/remove', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to update.');
  }
  // TODO:  Check to see if user is on team already....
  const project = await Project.findByIdAndUpdate(req.params.id,
    {
      $pull: { team: req.body.userId }
    },
    { new: true });

  if (!project) return res.status(404).send('The project with the given ID was not found');

  res.send(project);
});

router.post('/:id/issue/add', async (req, res) => {
  console.log('addissue')
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to update.');
  }
  // TODO:  Check to see if user is on team already....

  const issue = new Issue(_.pick(req.body, ['name']));

  const project = await Project.findByIdAndUpdate(req.params.id,
    {
      $push: { issues: issue._id },
    },
    { new: true });

  if (!project) return res.status(404).send('The project with the given ID was not found');

  await issue.save();
  res.send(project);
});

router.put('/:id/:issueId/remove', async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ProjectID to update.');
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.issueId)) {
    return res.status(404).send('Invalid IssueID to update.');
  }
  console.log(req.params.id, req.params.issueId);
  const project = await Project.findByIdAndUpdate(req.params.id,
    {
      $pull: { issues: mongoose.Types.ObjectId(req.params.issueId) }
    },
    { new: true });

  if (!project) return res.status(404).send('The project with the given ID was not found');

  const issue = await Issue.findByIdAndDelete(req.params.issueId);

  if (!issue) return res.status(404).send('The issue with the given ID was not found');

  res.send(project);
});

router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID to delete.');
  }

  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) return res.status(404).send('The project with the given ID was not found');

  res.send(project);
});

module.exports = router;