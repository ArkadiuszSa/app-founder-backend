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

router.get('/users-number', function(req, res, next){
 User.find({'visable':true}).then(function(users){
    res.send({"value":users.length});
  }).catch((err)=>{
    next(err);
  })
})

router.post('/users-range-filtred/:from&:to', function(req, res, next){

  let sort=req.body.sort;
  let filtr=req.body.filtr;
  let query=[];
  query.push({'visable':true});
  if(typeof(filtr.search.value)!=='undefined'&&filtr.search.value!==''&&filtr.search.value!==null){
    let regex='(.*)'+filtr.search.value+'(.*)';

    let $or=[
      { ['fName']:new RegExp(regex,"i")},
      { ['lfName']:new RegExp(regex,"i")},
      { ['technologies']:new RegExp(regex,"i")}
    ]

    query.push({
      $or
    });

    
  }
  findUsers(query,sort,req,res, next)

})

async function findUsers(query,sort,req,res, next) {

  query.push({
    [sort.type]:{$exists:true}
  })
  let notEmptySortUsers=await User.find({
    $and:query
    },{},{sort:{[sort.type]:sort.value}}
  ).then(function(users){
    return users;
  })

  query[query.length-1]={[sort.type]:{$exists:false}}
  User.find({
    $and:query
    },{},{sort:{[sort.type]:sort.value}}
  ).then(function(users){

    let finalUsers=notEmptySortUsers.concat(users);
    res.send({users:finalUsers.slice(req.params.from,req.params.to),length:finalUsers.length});
  })

}

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
      expiresIn: 86400
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