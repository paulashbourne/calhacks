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
      name : { 
        first : req.body.first_name,
        last  : req.body.last_name,
      },
      address : {
        street : req.body.street_address,
        city   : req.body.city,
        state  : req.body.state,
        zip    : req.body.zip
      },
      phone   : req.body.phone,
      items   : []
    });
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'User created!' });
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  });


module.exports = function (app) {
  app.use('/api', router);
};
