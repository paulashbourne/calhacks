var express    = require('express');
var moment     = require('moment');
var bodyParser = require('body-parser');

// Model imports
var Facility = require('./model/facility');
var Item     = require('./model/item');
var User     = require('./model/user');

var router = express.Router();
router.use(function(req, res, next) {
  var datestr = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log('['+datestr+']  ' + req.method + ' ' + req.path);
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Test endpoint
router.get('/', function(req, res) {
  res.json({message: 'Hello World'});   
});

// Begin actual endpoints
router.route('/users')
  .post(function(req, res) {
    var user = new User({
      name : req.body.name
    });
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'User created!' });
    });
  });


module.exports = function (app) {
  app.use('/api', router);
};
