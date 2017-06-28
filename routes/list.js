var express = require('express');
var router = express.Router();

//next = middleware support 99% dont need
router.get('/', function(req, res, next) {
  res.json([]);
});

router.post('/', function(req, res) {
  res.json({
    title: 'Hihih',
    cards: [],
    _id: 'adsfadsfa'
  });
});

module.exports = router;
