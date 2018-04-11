// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var usersSchema = new mongoose.Schema({
    userid: String,
    firstname: String,
    lastname: String,
    active: Boolean
});


// Return model
module.exports = restful.model('Users',usersSchema);