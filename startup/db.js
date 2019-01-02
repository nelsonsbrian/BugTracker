const mongoose = require('mongoose');

module.exports = function() {
  const db = 'mongodb://localhost/foodplan';
  mongoose.connect(db)
    .then(()=> console.log(`Connected to MongoDB....`));
}