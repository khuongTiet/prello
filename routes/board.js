var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('board', { title: 'Board | Prello', style: "/stylesheets/board.css", jscript: "/javascripts/board.js" });
});

module.exports = router;
