const mongoose = require('mongoose');

const chefsTable = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {type: String, required: true},
  password: {type: String, required:true},
  name: {type: String, required: true},
  location: {type: String, required: true},
  profilepic: {type:String, default: 'https://files.slack.com/files-pri/T4JUEB3ME-FL404HDB5/logo.jpg' },
});

module.exports = mongoose.model('Chefs', chefsTable);
