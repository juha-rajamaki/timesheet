// Dependencies
var express = require('express');
var router = express.Router();

// Models
var TimesModel = require('../models/times');
var UsersModel = require('../models/users');
var ProjectsModel = require('../models/projects');
// Routes
//router.get('/timeaction', function(req,res){
//    res.send('API responded')
//});
TimesModel.methods(['get', 'put', 'post', 'delete']);
TimesModel.register(router, '/timesheet');
UsersModel.methods(['get', 'put', 'post', 'delete']);
UsersModel.register(router, '/user');
ProjectsModel.methods(['get', 'put', 'post', 'delete']);
ProjectsModel.register(router, '/project');


// Return Router
module.exports = router;