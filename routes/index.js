var express = require('express');
var Hashes = require('jshashes');
var crypto = require('crypto');
var router = express.Router();

var User = require('../models/user');
var Board = require('../models/board');

var passwordHash = new Hashes.MD5();

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/', requireLogin, function(req, res) {
  Board.find({ $or: [{'author' : req.user.name}, {'permissions': req.user.name}]}, function(err, boards) {
    res.render('index', {title: 'Boards', userBoards: boards, style: "/stylesheets/index.css", jscript: "/javascripts/index.js"});
  });
});

router.get('/login', function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', {title: 'Login', style: "/stylesheets/login.css", jscript: "/javascripts/login.js", error: req.session.notification});
    req.session.notification = '';
  }
});

router.get('/password', function(req, res) {
  res.render('password', {title: 'Password Reset', style: "/stylesheets/password.css", jscript: "/javascripts/password.js"});
});

router.post('/reset-request', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (!user) {
      req.session.notification = 'Email not found!';
      res.redirect('/login');
    } else {
      var token = crypto.randomBytes(10).toString('hex');
      var passwordToken = passwordHash.hex(token);
      user.resetToken = passwordToken;
      user.resetExpires = Date.now() + 600000; // 10 Minutes to reset
      user.save(function(err, reset) {
        if (err) {
          console.log(err);
        } else {
          res.render('reset-form',
          {
            title: 'Reset Password Link',
            style: "/stylesheets/password.css",
            jscript: "/javascripts/password.js",
            pwToken: user.resetToken
          });
        }
      });
    }
  });
});

router.get('/reset/:resetToken', function(req, res) {
  User.findOne({resetToken: req.params.resetToken}, function(err, user) {
    if (!user) {
      req.session.notification = 'Invalid reset link';
      res.redirect('/');
    } else {
      if (Date.now() < user.resetExpires) {
        res.render('reset',
        {
          title: 'Reset Password',
          style: "/stylesheets/password.css",
          jscript: "/javascripts/password.js",
          pwToken: req.params.resetToken,
          notification: ''
        });
      } else {
        user.resetToken = '';
        req.session.notification = 'Link has expired';
        res.redirect('/');
      }
    }
  });
});

router.post('/reset/:resetToken', function(req, res) {
  User.findOne({resetToken: req.params.resetToken}, function(err, user) {
    if (!user) {
      console.log('Error');
    } else {
      user.password = passwordHash.hex(req.body.password);
      user.save(function(err, updated) {
        req.session.notification = 'Password has been reset';
        res.redirect('/');
      });
    }
  })
});


router.post('/signup', function(req, res) {
  var body = req.body;
  User.findOne({ email: body.register_email }, function(err, user) {
    if (!user) {
      var newUser = new User( {
        name: body.register_name,
        email: body.register_email,
        password: passwordHash.hex(body.register_password)
      });
      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
        } else {
          req.session.user = newUser;
          res.redirect('/');
        }
      });
    } else {
      res.render('login', { title: 'Login', style: "/stylesheets/login.css", jscript: "/javascripts/login.js", error: 'Email already in use' });
    }
  });

});


router.post('/login', function(req, res) {
  // make separate one for registering
  var body = req.body;
  User.findOne({ email: body.email }, function(err, user) {
    if (!user) {
      res.render('login', { title: 'Login', style: "/stylesheets/login.css", jscript: "/javascripts/login.js", error: 'Invalid email or password.' });
    } else {
      if (user && passwordHash.hex(body.password) === user.password) {
        req.session.user = user;
        req.session.notification = '';
        res.redirect('/');
      } else {
        res.render('login', { title: 'Login', style: "/stylesheets/login.css", jscript: "/javascripts/login.js", error: 'Invalid password!' });
      }
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/login');
});

module.exports = router;
