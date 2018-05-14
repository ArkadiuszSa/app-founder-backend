const express = require ('express');
var Boom = require('express-boom');
const router = express.Router();
const Offer= require('../models/offer');


router.get('/offers', function(req, res, next){
  Offer.find({}).then(function(offers){
    res.send(offers);
  })
})

router.get('/project-offers/:projectId', function(req, res, next){
  Offer.find({projectId: req.params.projectId}).then(function(offer){
    console.log(offer);
    res.send(offer);
  }).catch(next);
})

router.get('/offer/:id', function(req, res, next){
    Offer.findById({_id: req.params.id}).then(function(offer){
    res.send(offer);
  })
})

router.post('/offer', function(req, res, next){
  console.log(req.body);
  Offer.create(req.body).then(function(offer){
      res.send(offer);
  })
})


router.put('/offer/:id', function(req, res, next){
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.boom.badData('Data is not valid:', errors);
    return;
  } else {
    Offer.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(offer){
        res.send(offer);
    }).catch(next);
  }

});

router.delete('/offer/:id', function(req, res, next){
    Offer.findByIdAndRemove({_id: req.params.id}).then(function(offer){
      res.send(invitofferation);
    }).catch(next);
});





module.exports = router;