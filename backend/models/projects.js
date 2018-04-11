// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var projectsSchema = new mongoose.Schema({
    projectname: String,
    projectid: String,
    active: Boolean
});


// Return model
module.exports = restful.model('Projects',projectsSchema);