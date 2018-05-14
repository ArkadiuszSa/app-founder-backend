const express = require ('express');
var Boom = require('express-boom');
const router = express.Router();
const Team = require('../models/team');


router.get('/teams', function(req, res, next){
  Team.find({}).then(function(teams){
    res.send(teams);
  })
})

router.get('/teams-number', function(req, res, next){
  Team.find({'visable':true}).then(function(teams){
    res.send({"value":teams.length});
  }).catch((err)=>{
    next(err);
  })
})

router.get('/teams-range/:from&:to', function(req, res, next){

  try{
  
  Team.find({'visable':true},{}, {sort:{"timestamp":-1}}).then(function(teams){
    
    res.send(teams.slice(req.params.from,req.params.to));
  })
  }catch(err){
    console.log(err);
  }
})

router.get('/teams-for-user/:id', function(req, res, next){

  Team.find().or([
    {'teamLeaderId':req.params.id},
    {"membersId":req.params.id}
  ]).then(teams=>{
    res.send(teams);
  })
  .catch(err=>console.log(err));
})

router.get('/teams-for-leader/:id', function(req, res, next){

  Team.find().or([
    {'teamLeaderId':req.params.id}
  ]).then(teams=>{
    res.send(teams);
  })
  .catch(err=>console.log(err));
})

router.get('/team/:id', function(req, res, next){
  try{
  Team.findById({_id: req.params.id}).then(function(team){
    res.send(team);
  })
  }catch(err){
    console.log(err);
  }
})

router.post('/team', function(req, res, next){
 
  Team.create(req.body).then(function(team){
    res.send(team);
  })
})
router.put('/team/:id', function(req, res, next){

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.boom.badData('Data is not valid:', errors);
    return;
  } else {
    Team.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(team){
        res.send(team);
    }).catch(next);
    
  }

});

router.delete('/team/:id', function(req, res, next){
    Team.findByIdAndRemove({_id: req.params.id}).then(function(team){
      res.send(team);
    }).catch(next);
});

module.exports = router;