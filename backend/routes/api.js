// Dependencies
var express = require('express');
var router = express.Router();

// Models
var TimesModel = require('../models/times');

// Routes
//router.get('/timeaction', function(req,res){
//    res.send('API responded')
//});
TimesModel.methods(['get', 'put', 'post', 'delete']);
TimesModel.register(router, '/timesheet');


// Return Router
module.exports = router;