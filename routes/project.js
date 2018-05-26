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

router.post('/projects-range-filtred/:from&:to', function(req, res, next){
  let sort=req.body.sort;
  let filtr=req.body.filtr;

  let query=[];
  query.push({'visable':true});


  if(typeof(filtr.search.value)!=='undefined'&&filtr.search.value!==''&&filtr.search.value!==null){
    let regex='(.*)'+filtr.search.value+'(.*)';

    let $or=[
      { ['title']:new RegExp(regex,"i")},
      { ['technologies']:new RegExp(regex,"i")}
    ]

    query.push({
      $or
    });

  
  }
  if(filtr.status.value!==''&&filtr.status.value!==null&&filtr.status.value!==undefined){
    query.push({
      ['status']:filtr.status.value
    });
  }
  if(filtr.budget.from!==''&&filtr.budget.from!==null&&filtr.budget.from!==undefined){
    query.push({
      ["budget.value"]: {
         ['$gt'] : filtr.budget.from 
      }
    })
  }
  if(filtr.budget.to!==''&&filtr.budget.to!==null&&filtr.budget.to!=undefined){
    query.push({
      ["budget.value"]: {
         ['$lt'] : filtr.budget.to 
      }
    })
  }

  Project.find({
    $and:query
    },{},{sort:{[sort.type]:sort.value}}
  ).then(function(projects){
    res.send({projects:projects.slice(req.params.from,req.params.to),length:projects.length});
  }).catch(next);

})


router.get('/user-projects/:id', function(req, res, next){
  Project.find({ownerId: req.params.id}).then(function(projects){
    res.send(projects);
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