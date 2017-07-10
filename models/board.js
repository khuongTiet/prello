var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  author: String,
  date: Date,
  content: String
}, { versionKey: false });

var cardSchema = mongoose.Schema({
  name: String,
  labels: Array,
  members: Array,
  description: String,
  author: String,
  comments: [commentSchema]
}, { versionKey: false });

var listSchema = mongoose.Schema({
  title: String,
  cards: [cardSchema]
}, { versionKey: false });

var boardSchema = mongoose.Schema({
  name: String,
  author: String,
  members: Array,
  permissions: Array,
  lists: [listSchema]
},{ versionKey: false });



module.exports = mongoose.model('Board', boardSchema);
