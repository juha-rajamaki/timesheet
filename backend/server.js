var express = require ('express');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
const PORT = process.env.PORT || 3000
const DBUSER = process.env.DBUSER || ''
const DBPW = process.env.DBPW || ''
// TODO fix the MongoDB connect
// if you want to activate connection to MongoDB
// remove the following comment 
// MongoDD

console.log("DBUSER is : "+ DBUSER + "!");
if (DBUSER=='') {
    console.log("Connection to localhost DB");
    mongoose.connect('mongodb://localhost/timesheet');
} else {
    console.log("Connection to testing DB");
    mongoose.connect(`mongodb://${ DBUSER}:${ DBPW }@ds151259.mlab.com:51259/worktime`);
}

//Express0
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Create a simple router to be able to see this is working 

//Routes
app.use('/api', require('./routes/api'));

// Start server
//app.listen (3000);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
//console.log('server is listening on port 3000');
