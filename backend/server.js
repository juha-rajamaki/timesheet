var express = require ('express');
var mongoose = require('mongoose');

// TODO fix the MongoDB connect
// if you want to activate connection to MongoDB
// remove the following comment 
// mongoose.connect('mongodb:127.0.0.1:27017/timesheet');

var app = express();

// Create a simple router to be able to see this is working 

app.get('/' , function(req,res){
    res.send('Time Sheet Backend');
});

app.listen (3000);
console.log('server is listening on port 3000');
