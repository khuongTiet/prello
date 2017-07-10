var express = require('express');
var mongoose = require('mongoose');

var Board = require('../models/board');
var List = require('../models/list');
var Card = require('../models/card');


var router = express.Router();

router.get('/', function(req, res, next) {
  Board.find(function(err, boards) {
    res.json(boards); // Pull from db
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var newBoard = new Board(
    {
      name: req.body.title,
      author: req.user.name
    }
  );

  permissions.push(req.user.name);

  newBoard.save(function(err, board) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.get('/:boardid', function(req, res, next) {
  Board.findById(req.params.boardid, function(err, boardPage) {
    if (boardPage) {
      res.render('board', {title: boardPage.name, boardPage, style: "/stylesheets/board.css", jscript: "/javascripts/board.js"});
    }
  });
});

router.delete('/:boardid', function(req, res, next) {
  Board.findByIdAndRemove(req.params.boardid, function(err) {
    res.json();
  });
});

router.get('/:boardid/list', function(req, res, next) {
  List.find(function(err, lists) {
    res.json(lists); // Pull from db
  });
});

router.post('/:boardid/list', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var newList = {
        title: req.body.title
      };
      // first error, second newly created document
      board.lists.push(newList);
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('back');
        }
      });
    }
  });
});

router.patch('/:boardid/list/:listid', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var toUpdate = board.lists.id(req.params.listid);
      toUpdate.name = req.body.name;
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.json(updated);
        }
      });
    }
  });
});

router.delete('/:boardid/list/:listid', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var toUpdate = board.lists.id(req.params.listid);
      toUpdate.remove();
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.json("");
        }
      });
    }
  });
});

// :LISTID params.LISTID

router.post('/:boardid/list/:listid/card', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var toUpdate = board.lists.id(req.params.listid);
      var newCard = {
        name: req.body.name,
        author: req.user.name
      };
      toUpdate.cards.push(newCard);
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('back');
        }
      });
    }
  });
});

router.patch('/:boardid/list/:listid/card/:cardid', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var toUpdate = board.lists.id(req.params.listid);
      var cardUpdate = toUpdate.cards.id(req.params.cardid);
      cardUpdate.name = req.params.name;
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.json(updated);
        }
      });
    }
  });
});

router.delete('/:boardid/list/:listid/card/:cardid', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var toUpdate = board.lists.id(req.params.listid);
      var cardUpdate = toUpdate.cards.id(req.params.cardid);
      cardUpdate.remove();
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.json(updated);
        }
      });
    }
  });
});

router.post('/:boardid/list/:listid/card/:cardid/comment', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var newComment = {
        content: req.body.content,
        author: req.user.name,
        date: date
      }
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.json(updated);
        }
      });
    }
  });
});

module.exports = router;
