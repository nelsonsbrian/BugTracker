const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { Comment, validate } = require('../models/comment');
const { Gathering } = require('../models/gathering');
const router = express.Router();

router.get('/me', async (req, res) => {

});

router.post('/:gathId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.gathId)) {
    return res.status(404).send('Invalid gatherer ID to create a comment.');
  }

  const gathering = await Gathering.findByIdAndUpdate(req.params.gathId,
    {
     $push: {comments: req.body.comment}
    },
    { new: true }
    );

  if (!gathering) return res.status(404).send('The gathering with the given ID was not found');

  res.send(gathering);
});

module.exports = router;  