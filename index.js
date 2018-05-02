const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetch = require('fetch');
const app = express();

// username and password have been obscured
mongoose.connect('mongodb://<username>:<password>@ds163689.mlab.com:63689/lm-test_00');
mongoose.Promise = global.Promise;


const port = process.env.PORT;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api',require('./routes/api'));

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
})


app.listen(process.env.PORT, function(){
    console.log('Now listening for requests on port ' + process.env.PORT + '!');
});