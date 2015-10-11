var express    = require('express');
var moment     = require('moment');
var bodyParser = require('body-parser');
var _          = require('underscore');

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
    var params = req.body;
    params.password = User.encrypt_password(params.password);
    params.items = [];
    var user = new User(params);
    user.save(function(err) {
      if (err)
        res.send(err);
      res.json(user);
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  })

router.route('/users/:id')
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  })
  .put(function(req, res) {
    var params = req.body;
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);
      _.extend(user, params);
      user.save(function(err) {
        if (err)
          res.send(err);
        res.json(user);
      });
    });
  });


module.exports = function (app) {
  app.use('/api', router);
};
