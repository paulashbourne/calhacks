var User = require('../model/user');
var _    = require('underscore');

module.exports = function(router) {
  router.route('/users')
    .post(function(req, res) {
      var params = req.body;
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
};
