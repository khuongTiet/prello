var express = require('express');
var mongoose = require('mongoose'); // used to create a model

var router = express.Router();


var List = mongoose.model('List',
 {
   title: String,
   cards: Array
 }
);

var Card = mongoose.model('Card',
 {
   description: String
 }
);

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


router.post('/*/card', function(req, res) {
  console.log(req.body.description);
  var newCard = new Card(
    { description: req.body.description }
  );
  console.log(newCard);
  // first error, second newly created document
  List.findByIdAndUpdate(req.params[0], { $push: {"cards": newCard} }, function(err, listed) {
  });
  newCard.save(function (err, card) {
    if (err) {
      console.log(err);
    } else {
      res.json(card);
    }
  });
});

router.delete('/*/card/*', function(req, res) {
  console.log("hello");
});

module.exports = router;

// new connection > localhost >

// --save for dependencies ON THE TEST

// __v is version, can be disabled
