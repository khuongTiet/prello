var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('boards', { title: 'Boards | Prello', style: "/stylesheets/boards.css", jscript: "/javascripts/boards.js" });
});

module.exports = router;