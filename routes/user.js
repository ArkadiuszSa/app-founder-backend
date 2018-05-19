const express = require ('express');
var Boom = require('express-boom');
const router = express.Router();
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


router.get('/users', function(req, res, next){
  User.find({'visable':true}).then(function(data){
    res.send(data);
  }).catch(res=>{
    console.log(res);
    res.send('dziala')
  })
})

router.get('/user/:id', function(req, res, next){
  User.findById({_id: req.params.id}).then(function(data){
    res.send(data);
  }).catch(err=>{
    console.log(err);
    res.send(err);
  });
})

router.post('/user', function(req, res, next){

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    var token = jwt.sign({ id: user._id }, 'secretPassword', {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 


  
});

router.put('/user/:id', function(req, res, next){

    User.findByIdAndUpdate({_id: req.params.id},req.body,{new: true }).then(function(model){
        res.send(model);
    }).catch(next);
    
  

});

router.delete('/user/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
      res.send(user);
    }).catch(next);
});

module.exports = router;