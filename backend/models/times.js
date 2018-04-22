// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var timesSchema = new mongoose.Schema({

    userid: String,
    project: String,
    starttime: Date,
    endtime: Date,
    notes: String
});


// Return model
module.exports = restful.model('Times',timesSchema);