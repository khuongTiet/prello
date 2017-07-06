var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Signup | Prello', style: "/stylesheets/login.css", jscript: "/javascripts/login.js" });
});

router.post('/', function(req, res) {
  if (req.body.name !== "") {
    alert("registering");
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
  }

});

module.exports = router;
