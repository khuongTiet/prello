var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome Board | Prello', style: "/stylesheets/index.css", jscript: "/javascripts/index.js" });
});

router.get('/test', function(req, res) {
  res.send('hihihihihi');
});

module.exports = router;
