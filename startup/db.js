const mongoose = require('mongoose');

module.exports = function() {
  const db = 'mongodb://localhost/foodplan';
  mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> console.log(`Connected to MongoDB....`));
}