const express = require('express');
const gatherings = require('../routes/gatherings');
const users = require('../routes/users');
const comments = require('../routes/comments');
const meals = require('../routes/meals');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/gatherings', gatherings);  
  app.use('/api/users', users);
  app.use('/api/comments', comments);
  app.use('/api/meals', meals);
}