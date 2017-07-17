var express = require('express');
var mongoose = require('mongoose');

var Board = require('../models/board');

var authorize = require('../libs/authorize')

var router = express.Router();

var io = require('../socketio');

router.get('/', function(req, res, next) {
  Board.find(function(err, boards) {
    res.json(boards); // Pull from db
  });
});

router.post('/', function(req, res, next) {
  var newBoard = new Board(
    {
      name: req.body.title,
      author: req.user.name,
      permissions: [req.user.name],
      color: 'main-color'
    }
  );

  newBoard.save(function(err, board) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.get('/:boardid', authorize, function(req, res, next) {
  Board.findById(req.params.boardid, function(err, boardPage) {
    if (boardPage) {
      res.render('board', {user: req.user, title: boardPage.name, boardPage, style: "/stylesheets/board.css", jscript: "/javascripts/board.js"});
    }
    io.getInstance().emit('join', {roomid: req.params.boardid, user: req.user.name});
  });
});

router.delete('/:boardid', function(req, res, next) {
  Board.findByIdAndRemove(req.params.boardid, function(err) {
    res.json('');
  });
});

router.post('/:boardid/member', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      board.permissions.push(req.body.member);
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

router.patch('/:boardid/color', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      board.color = req.params.color;
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.json('');
        }
      });
    }
  });
});

router.get('/:boardid/list', function(req, res, next) {
  Board.findById(req.params.boardid, function(err, board) {
    res.json(board.lists); // Pull from db
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
          res.json(board.lists[board.lists.length -1]);
        }
        io.getInstance().to(req.params.boardid).emit('newList', {user: req.user.name, list: board.lists[board.lists.length - 1]});
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
          var jsonCard = toUpdate.cards[toUpdate.cards.length - 1]
          io.getInstance().to(req.params.boardid).emit('newCard', {card: jsonCard, lid: req.params.listid});
          res.json(jsonCard);
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

router.post('/:boardid/list/:listid/card/:cardid/labels', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      board.lists
      .id(req.params.listid)
      .cards.id(req.params.cardid)
      .labels.push(req.body.label);
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          res.json('');
        }
        io.getInstance().to(req.params.boardid).emit('newLabel',
        {
          roomid: req.params.boardid,
          cid: req.params.cardid,
          author: req.user.name,
          label: req.body.label
        });
      });
    }
  });
});

router.post('/:boardid/list/:listid/card/:cardid/comments', function(req, res) {
  Board.findById(req.params.boardid, function(err, board) {
    if (board) {
      var today = new Date();
      var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var newComment = {
        content: req.body.content,
        author: req.user.name,
        date: currentDate
      }
      board.lists
      .id(req.params.listid)
      .cards.id(req.params.cardid)
      .comments.push(newComment);
      board.save(function(err, updated) {
        if (err) {
          console.log(err);
        } else {
          var targetCard = board.lists.id(req.params.listid).cards.id(req.params.cardid);
          var comment = targetCard.comments[targetCard.comments.length - 1];
          res.json(comment);
          io.getInstance().to(req.params.boardid).emit('newComment', comment);
        }
      });
    }
  });
});

module.exports = router;
