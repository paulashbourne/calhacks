var Delivery = require('../model/delivery');
var _ = require('underscore')

module.exports = function(router) {
  router.route('/deliveries')
    .post(function(req, res) {
      var params = req.body;
      var delivery = new Delivery(params);
      delivery.save(function(err) {
        if (err)
          res.send(err);
        res.json(delivery);
      });
    })
    .get(function(req, res) {
      Delivery.find(function(err, deliveries) {
        if (err)
          res.send(err);
        res.json(deliveries);
      });
    })

  router.route('/deliveries/:id')
    .get(function(req, res) {
      Delivery.findById(req.params.id, function(err, delivery) {
        if (err)
          res.send(err);
        res.json(delivery);
      });
    })
    .put(function(req, res) {
      var params = req.body;
      Delivery.findById(req.params.id, function(err, delivery) {
        if (err)
          res.send(err);
        _.extend(delivery, params);
        delivery.save(function(err) {
          if (err)
            res.send(err);
          res.json(delivery);
        });
      });
    });
};
