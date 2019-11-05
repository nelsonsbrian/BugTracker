const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {

  // Connect to DB
  const dbStr = config.get('db');
  mongoose.connect(dbStr, { useNewUrlParser: true })
    .then(() => console.log(`Connected to MongoDB....`));

  // Error Handle for DB
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error))
}