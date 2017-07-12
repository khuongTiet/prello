
var mongoose = require('mongoose');
var Board = require('../models/board');

module.exports = function(req, res, next) {
  var bid = req.params.boardid;
  if (req.user) {
    Board.findById(bid, function(err, board) {
      if (!board) {
        console.log("Board does not exists!");
        res.redirect('back');
      } else {
        if (board.permissions.indexOf(req.user.name) > -1) {
          next();
        } else {
          console.log("NOT AUTHORIZED");
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
}
