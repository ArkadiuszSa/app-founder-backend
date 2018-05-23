const express = require ('express');
var Boom = require('express-boom');
const router = express.Router();
const Invitation= require('../models/invitation');


router.get('/invitations', function(req, res, next){
  Invitation.find({}).then(function(invitations){
    res.send(invitations);
  })
})

router.get('/user-invitations/:userId', function(req, res, next){

  Invitation.find({userId: req.params.userId}).then(function(invitations){
    res.send(invitations);
  })
})

router.get('/team-invitations/:teamId', function(req, res, next){
  Invitation.find({teamId: req.params.teamId}).then(function(invitations){
    res.send(invitations);
  })
})

router.get('/invitation/:id', function(req, res, next){
  Invitation.findById({_id: req.params.id}).then(function(invitation){
    res.send(invitation);
  })
})

router.post('/invitation', function(req, res, next){
  Invitation.create(req.body).then(function(invitation){
      res.send(invitation);
  })
})


router.put('/invitation/:id', function(req, res, next){


  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.boom.badData('Data is not valid:', errors);
    return;
  } else {
    Invitation.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(invitation){
        res.send(invitation);
    }).catch(next);
    
  }

});

router.delete('/invitation/:id', function(req, res, next){
  Invitation.findByIdAndRemove({_id: req.params.id}).then(function(invitation){
      res.send(invitation);
    }).catch(next);
});





module.exports = router;