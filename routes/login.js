const express = require ('express');
var Boom = require('express-boom');
const router = express.Router();
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/register', function(req, res, next){

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, 'secretPassword', {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
});


router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    console.log(req.body);

    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({
       id: user._id,
       role:'user',
       expiresIn: 86400
      }, 'secretPassword', {
      expiresIn: 3600 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, id: user._id, role:'user'});
  });
});


module.exports = router;