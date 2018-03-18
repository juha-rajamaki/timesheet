// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var timesSchema = new mongoose.Schema({

    project: String,
    starttime: Date,
    endtime: Date,
    Notes: String
});


// Return model
module.exports = restful.model('Times',timesSchema);