const mongoose = require('mongoose');
const express = require('express');
const { Issue, validate } = require('../models/issue');
const { Project } = require('../models/project');
const router = express.Router();

router.get('/:gathId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.gathId)) {
    return res.status(404).send('Invalid ID to get.');
  }

  const issues = await Project.findById(req.params.gathId).select('issues');
  if (!issues) return res.status(404).send('The project with the given ID was not found');

  res.send(issues);
});

router.post('/:gathId', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.gathId)) {
    return res.status(404).send('Invalid gatherer ID to create a comment.');
  }

  let issue = new Issue({
    name: req.body.name,
    notes: req.body.notes,
  });

  const project = await Project.findByIdAndUpdate(req.params.gathId,
    {
      $push: { issues: issue }
    },
    { new: true }
  );

  if (!project) return res.status(404).send('The project with the given ID was not found');

  res.send(project);
});

module.exports = router;  