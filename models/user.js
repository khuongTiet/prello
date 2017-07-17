var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetToken: String,
  resetExpires: Date
}, { versionKey: false });

module.exports = mongoose.model('User', schema);
