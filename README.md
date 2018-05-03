
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


"
git commit -m "first commit"
git remote add origin1 https://github.com/olddognewtrix123/lm_05.git
git push -u origin1 master
"
git add -A && git commit -m "brief message"
git push -u origin1 master

This is a step by step for setting up a sinple nodejs express app.
Everything was done in clout 9 io
The database was set up in the c9 environment
Mongoose was used to connect to the db

 I. Set up mongodb and node js
 II. Set up the package.json
 II. Set up index.js and test with a couple of routes
 III. Create Routes folder with API file
    A. add express and add router object to API file
    B. add routes to API file
    C. Allow routes to be used by Index file
        i. 'module.exports = router;' at bottom of api.js
        ii. 'const routes = require('./routes/api');' and then 'app.use(routes);' in index.js
        
    CAVEAT: We actually want the url to be yaddayaddda/api/ninjas but only have to put '/ninjas' in
    each individual route (coder laziness). So, in index.js 'app.use(routes);' is actually 
    'app.use('/api',routes);' so that all the routes are actually prefaced with '/api/'
    
    CAVEAT: More coder laziness:
    
        const express = require('express');

        const routes = require('./routes/api');

        const app = express();

        const port = process.env.PORT;

        app.use('/api',routes);
        
    actually becomes this:
    
        const express = require('express');

        const app = express();

        const port = process.env.PORT;

        app.use('/api',require('./routes/api'));
IV. Define Models and Schemas
    A. Schemas define the structure of the data objects
    B. Models represent collections in MongoDB
    
V. Connect to Mongoose

VI. Update your routes to do what you actually want them to do and meet requirements

VII. Update index.js with middleware that serves static files like HTML and CSS

VIII. Create your react components


    

How I set up mongodb in c9,io:

https://community.c9.io/t/setting-up-mongodb/1717

$sudo apt-get install -y mongodb-org
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod

to run mongodb:
$ ./mongod

MongoDB parameters used:
--dbpath=data - Because it defaults to /var/db (which isn’t accessible)
--nojournal - Because mongodb usually pre-allocates 2 GB journal file (which exceeds Cloud9 disk space quota)
--bind_ip=$IP - Because you can’t bind to 0.0.0.0
--rest - Runs on default port 28017

created package json with $MongoDB parameters used:
--dbpath=data - Because it defaults to /var/db (which isn’t accessible)
--nojournal - Because mongodb usually pre-allocates 2 GB journal file (which exceeds Cloud9 disk space quota)
--bind_ip=$IP - Because you can’t bind to 0.0.0.0
--rest - Runs on default port 28017


Now that the mongo db and node stuff is all set up, gonna set up the Express app...

Express is not necessary but why the heck would you not?

$npm install express --save

Now, gonna create the express app...

create index.js file in root

FOR TESTING USE https://ninja-0-olddognewtrix123.c9users.io in the browser


ROUTES

Routes technically can just be left in the index.js file:

        const express = require('express');

        // setup express app
        const app = express();

        const port = process.env.PORT;

        app.get('/', function(req, res){
            console.log('This is a Get Request.');
           res.send({name: 'Welcome'});
        });

        app.get('/api', function(req, res){
            console.log('This is a Get Request.');
           res.send({name: 'The ninja you seek is Yoshi'});
        });

        // listen for request

        app.listen(process.env.PORT, function(){
            console.log('Now listening for requests!');
        });
    
    However, these types of applications are usually kept very modular. 
    So, on the route level, a Routes folder is created and in that folder is an api.js file.
    
    For your routes, you are going to be using the Express module class. So you will also need express in the api.js file in the routes folder.
    
    
The next question is when a Post comes in, how do you handle that data?  This is where the middleware called body-parser comes in.

Body-parser gets used before the particular route gets invoked. It parese the request, then attaches it to the request object.

So, it's $ npm install body-parser --save

Next, require body-parser in index.js

Then, since we are assuming the data object will be in json formate, we precede the middleware for the route with the 
following in index.js: app.use(bodyParser.json());

Then, to access whatever was sent via a Post method, to for example send it to console, go to the Post in api.js and 
update with the following:

    router.post('/ninjas', function(req, res){
        console.log(req.body);
        res.send({'type':'POST'});
    });

To do the same thing but also send a response to the client:

    router.post('/ninjas', function(req, res){
        console.log(req.body);
        res.send({
            'type':'POST',
            name: req.body.name,
            rank: req.body.rank
        });
    });
    

OK, now it is time to start thinking about models and schemas...

Schemas
{
        name: String,
        rank: String,
        available: Boolean
}

Use Mongoose to manage the data from mongodb

$ npm install mongoose --save

Create a models folder at the root level and in that folder create a ninjs.js file for the ninja models
Require mongoose in that file and define the schema

Then define a model that will represent a collection in the database

In ninja.js:

    // mongoose will create a collection called 'ninjas' in the database
    const Ninja = mongoose.model('ninja', NinjaSchema);

    // export so it can be used in other fiels
    module.exports = Ninja;


So, now that you have set up your api and your handlers and your schema, it is time to connect to and start working with the database, via Mongoose

First, have the db running in the background and then you have to tell the application about it. 

    //connection string
    //mongoose.connect('mongodb://localhost:28017/ninjago')
    mongoose.connect('mongodb://localhost/ninjago');

    // mongoose's version of the promise is deprecated to gonna override it
    mongoose.Promise = global.Promise;
    
Now, that connects to mongodb. So how is the the data from a Post request to be stored?  For that, we go back to the handlers in the api.js file

    const express = require('express');

    const router = express.Router();

    const Ninja = require('../models/ninja');

    //get a list of ninjas from the databasee
    router.get('/ninjas', function(req, res){
        res.send({'type':'GET'});
    });

    // handle a new ninja and send the object to the client
    router.post('/ninjas', function(req, res){
      //  var ninja = new Ninja(req.body);
      //  ninja.save();
      // Ninja.create(req.body);  // does the same as the two lines above
      Ninja.create(req.body).then(function(ninja){
          res.send(ninja);
      });
    });
    
    CAVEAT: At this point you need to be thinking about error handling.
    This will be handled by middleware that follows the Route Handlers. 
    
    router.post('/ninjas', function(req, res){
      Ninja.create(req.body).then(function(ninja){
          res.send(ninja);
      });
    });
    
    becomes
    
    router.post('/ninjas', function(req, res, next){
      Ninja.create(req.body).then(function(ninja){
          res.send(ninja);
      }).catch(next);
    });
    
    and in index.js the next item in the stack is
    
    // error handling middleware
    app.use(function(err, req, res, next){
        //console.log('error!');
        res.statue(422).send({error: err.message});
    })
    
    
Now on to delete requests and removing stuff from the db.

    // delete a ninja from the db
    router.delete('/ninjas/:id', function(req, res, next){
        // whatever id is, get it from the request parameters
        Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });

    module.exports = router;
    
Now, to handle PUT requests (updates existing data in the db)

This will be similar to the Delete request!

NOW, the Get REquest
    
# lm_05
