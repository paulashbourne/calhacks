var express = require('express');
var moment  = require('moment');

var router = express.Router();

router.use(function(req, res, next) {
  var datestr = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log('['+datestr+']  ' + req.method + ' ' + req.path);
  next();
});

router.get('/', function(req, res) {
  res.json({message: 'Hello World'});   
});

module.exports = function (app) {
  app.use('/api', router);
};
