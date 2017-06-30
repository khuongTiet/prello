var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('boards', { title: 'Login | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js" });
});

module.exports = router;
