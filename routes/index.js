var express = require('express');
var router = express.Router();

var User = require('../models/user');

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/login');
      } else {
        // expose the user to the template
        res.locals.user = user;

        res.render('index', { title: 'Welcome Board | Prello', style: "/stylesheets/index.css", jscript: "/javascripts/index.js" });
      }
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/login');
});

/* GET home page. */
// router.get('/', requireLogin, function(req, res, next) {
//   res.render('index', { title: 'Welcome Board | Prello', style: "/stylesheets/index.css", jscript: "/javascripts/index.js" });
// });


module.exports = router;
