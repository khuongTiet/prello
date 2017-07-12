var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Board = require('../models/board');

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/', requireLogin, function(req, res) {
  Board.find({ $or: [{'author' : req.user.name}, {'permissions': req.user.name}]}, function(err, boards) {
    res.render('index', {title: 'Boards | Prello', userBoards: boards, style: "/stylesheets/index.css", jscript: "/javascripts/index.js"});
  });
});

router.get('/login', function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', {title: 'Login | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js"});
  }
});

router.post('/signup', function(req, res) {
  var body = req.body;
  User.findOne({ email: body.register_email }, function(err, user) {
    if (!user) {
      var newUser = new User( {
        name: body.register_name,
        email: body.register_email,
        password: body.register_password
      });
      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    } else {
      res.render('login.ejs', { error: 'Email already in use.' });
    }
  });

});


router.post('/login', function(req, res) {
  // make separate one for registering
  var body = req.body;

  User.findOne({ email: body.email }, function(err, user) {
    if (!user) {
      res.render('login.ejs', { title: 'Login | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js", error: 'Invalid email or password.' });
    } else {
      if (user && body.password === user.password) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('login.ejs', { error: 'Invalid email or password.' });
      }
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.render('login', {title: 'Login | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js"});
});

module.exports = router;
