const express = require('express');
const projects = require('../routes/projects');
const users = require('../routes/users');
const comments = require('../routes/comments');
const issues = require('../routes/issues');

module.exports = function (app) {

  app.use(express.json());
  app.use('/api/projects', projects);
  app.use('/api/users', users);
  app.use('/api/comments', comments);
  app.use('/api/issues', issues);
}