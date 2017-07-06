var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  labels: Array,
  members: Array,
  description: String,
  author: String,
  comments: Array
});

module.exports = mongoose.model('Card', schema);
