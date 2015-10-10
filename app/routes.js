var express = require('express');

var router = express.Router();

router.use(function(req, res, next) {
  var datestr = Date.now();
  console.log(req.method + ' ' + req.path + '['+datestr+']');
  next();
});

router.get('/', function(req, res) {
  res.json({message: 'Hello World'});   
});

module.exports = function (app) {
  app.use('/api', router);
};
