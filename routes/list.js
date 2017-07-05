var express = require('express');
var mongoose = require('mongoose'); // used to create a model

var List = require('../models/list');
var Card = require('../models/card');

var router = express.Router();

//next = middleware support 99% dont need
router.get('/', function(req, res, next) {
  List.find(function(err, lists) {
    res.json(lists); // Pull from db
  });
});

router.post('/', function(req, res) {
  var newList = new List(
    { title: req.body.title }
  );
  // first error, second newly created document
  newList.save(function (err, list) {
    if (err) {
      console.log(err);
    } else {
      res.json(list);
    }
  });
});

router.patch('/*', function(req, res) {
  console.log(req.params[0]);
  List.findByIdAndUpdate(req.params[0], { title: req.body.title, cards: req.body.cards }, function(err, listed) {
    res.json(listed);
  })
});

router.delete('/*', function(req, res) {
  List.findByIdAndRemove(req.params[0], function(err){
    res.json();
  });
});

// :LISTID params.LISTID

router.post('/*/card', function(req, res) {
  var newCard = new Card(
    { description: req.body.description,
      name: req.body.name
    }
  );
  // first error, second newly created document
  List.findByIdAndUpdate(req.params[0], { $push: {"cards": newCard} }, function(err, listed) {});
  newCard.save(function (err, card) {
    if (err) {
      console.log(err);
    } else {
      res.json(card);
    }
  });
});

router.patch('/*/card/*', function(req, res) {
  Card.findByIdAndUpdate(req.params[1], {description: req.body.description}, function(err, carded) {
    res.json(carded);
  })
  List.findByIdAndUpdate(req.params[0], { title: req.body.title, cards: req.body.cards }, function(err, listed) {
    res.json(listed);
  })
});

router.delete('/*/card/*', function(req, res) {
  Card.findByIdAndRemove(req.params[1], function(err) {
    res.json();
  });
  List.findByIdAndUpdate(req.params[0], { $pull: {"cards": req.params[1]} }, function(err, listed) {});
});

module.exports = router;

// new connection > localhost >

// --save for dependencies ON THE TEST

// __v is version, can be disabled
