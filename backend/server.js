var express = require ('express');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');

// TODO fix the MongoDB connect
// if you want to activate connection to MongoDB
// remove the following comment 
// MongoDD
mongoose.connect('mongodb://localhost/timesheet');

//Express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Create a simple router to be able to see this is working 

//Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen (3000);
console.log('server is listening on port 3000');
