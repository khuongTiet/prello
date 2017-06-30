var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Boards | Prello', style: "/stylesheets/boards.css", jscript: "/javascripts/boards.js" });
});

router.get('/test', function(req, res) {
  res.send('hihihihihi');
});

module.exports = router;
