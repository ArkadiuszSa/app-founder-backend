const express = require ('express');
var Boom = require('express-boom');
const router = express.Router();
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/register', function(req, res, next){

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
    User.create({
      email : req.body.email,
      password : hashedPassword,
      timestamp:req.body.timestamp
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
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

router.post('/check-email', function(req, res) {


  console.log(req.body)
  User.findOne({ email: req.body.email }, function (err, user) {
    console.log(user)
    if(user!==null){
      res.send({response:'finded'})
    }
    else{
      res.send({response:'notFinded'})
    }
  });
});



module.exports = router;