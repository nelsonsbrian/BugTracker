const express = require('express');
const gatherings = require('../routes/gatherings');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/gatherings', gatherings);  
}