var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: String,
  cards: Array
});

module.exports = mongoose.model('List', schema);
