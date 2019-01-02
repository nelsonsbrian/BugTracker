const express = require('express');
const gatherings = require('../routes/gatherings');
const users = require('../routes/users');
const comments = require('../routes/comments');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/gatherings', gatherings);  
  app.use('/api/users', users);
  app.use('/api/comments', comments);
}