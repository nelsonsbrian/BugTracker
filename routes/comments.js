const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { Comment, validate } = require('../models/comment');
const { Gathering } = require('../models/gathering');
const router = express.Router();

router.get('/:gathId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.gathId)) {
    return res.status(404).send('Invalid ID to get.');
  }

  const comments = await Gathering.findById(req.params.gathId).select('comments');
  if (!comments) return res.status(404).send('The gathering with the given ID was not found');

  res.send(comments);
});

router.post('/:gathId', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.gathId)) {
    return res.status(404).send('Invalid gatherer ID to create a comment.');
  }

  let comment = new Comment({
    user: {
      name: req.body.user.name,
      userName: req.body.user.userName
    },
    message: req.body.message,
  });

  const gathering = await Gathering.findByIdAndUpdate(req.params.gathId,
    {
      $push: { comments: comment }
    },
    { new: true }
  );

  if (!gathering) return res.status(404).send('The gathering with the given ID was not found');

  res.send(gathering);
});

module.exports = router;  