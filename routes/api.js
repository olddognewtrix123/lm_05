const express = require('express');

const router = express.Router();

const Ninja = require('../models/ninja');

router.get('/ninjas', function(req, res, next){
    
    // finds everybody - keep for testing!!
    Ninja.find({}).then(function(ninjas){
        res.send(ninjas)
    })
 });  

router.post('/ninjas', function(req, res, next){
  Ninja.create(req.body).then(function(ninja){
      res.send(ninja);
  }).catch(next);
});



module.exports = router;

