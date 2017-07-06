var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js" });
});

router.post('/', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      res.render('login.ejs', { title: 'Login | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js", error: 'Invalid email or password.' });
    } else {
      if (req.body.password === user.password) {
        console.log("passwords match");
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('login.ejs', { error: 'Invalid email or password.' });
      }
    }
  });
});

module.exports = router;
