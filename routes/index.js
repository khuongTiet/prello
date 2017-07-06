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

router.get('/', requireLogin, function(req, res) {
  res.render('index', {title: 'Boards | Prello', style: "/stylesheets/boards.css", jscript: "/javascripts/boards.js"});
});

router.get('/login', function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', {title: 'Login | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js"});
  }
});


router.post('/login', function(req, res) {
  // make separate one for registering
  var newUser = new User( {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
        } else {
          res.json(user);
          res.redirect('login');
        }
      });
    } else {
      res.render('signup', { error: 'Email already in use.' });
    }
  });
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
