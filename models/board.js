var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  creator: Array,
  members: Array,
  lists: Array
});

module.exports = mongoose.model('Card', schema);
