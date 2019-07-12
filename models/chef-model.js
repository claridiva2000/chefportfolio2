const mongoose = require('mongoose');

const chefsTable = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  location: String
});

module.exports = mongoose.model('Chefs', chefsTable);
