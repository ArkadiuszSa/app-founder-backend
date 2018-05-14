const express = require ('express');
var Boom = require('express-boom');
const router = express.Router();
const Project = require('../models/project');
const jwt = require('jsonwebtoken');


router.get('/projects', function(req, res, next){
  Project.find({}).then(function(projects){
    res.send(projects);
  }).catch(err=>{
    res.send(err);
  })
})



router.get('/projects-number', function(req, res, next){
  Project.find({'visable':true}).then(function(projects){
    res.send({"value":projects.length});
  }).catch((err)=>{
    next(err);
  })
})

router.get('/projects-range/:from&:to', function(req, res, next){

  Project.find({'visable':true},{}, {sort:{"timestamp":-1}}).then(function(projects){
    res.send(projects.slice(req.params.from,req.params.to));
  }).catch(next);

})

router.get('/user-projects/:id', function(req, res, next){

  Project.find({ownerId: req.params.id}).then(function(projects){
    res.send(projects);
    console.log(projects)
  }).catch(next)

})


router.get('/project/:id', function(req, res, next){

  Project.findById({_id: req.params.id}).then(function(project){
    res.send(project);
  }).catch(next)

})

router.post('/project', function(req, res, next){

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.boom.badData('Data is not valid:', errors);
    return;
  } else {
    Project.create(req.body).then(function(project){
        res.send(project);
    }).catch(next);
  }

});

router.put('/project/:id', function(req, res, next){

    Project.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(project){
      console.log(project)
        res.send(project);
    }).catch(next);
    
});

router.delete('/project/:id', function(req, res, next){
    Project.findByIdAndRemove({_id: req.params.id}).then(function(project){
      res.send(project);
    }).catch(next);
});

module.exports = router;