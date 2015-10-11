var Delivery = require('../model/delivery');
var _        = require('underscore');
var async    = require('async');

module.exports = function(router) {
  router.route('/postmates')
    .post(function(req, res) {
      var params = req.body.data;
      async.auto({
        getDelivery: function(callback) {
          Delivery.findOne({'delivery_id':params.id}, callback)
        },
        updateDelivery: ['getDelivery', function(callback, results) {
          _.extend(results.getDelivery, {
            postmates_id : params.id,
            state        : params.status,
            pickup_eta   : params.pickup_eta,
            dropoff_eta  : params.dropoff_eta,
            complete     : params.complete,
            courier      : params.courier
          });
          results.getDelivery.save(callback)
        }],
        handleEvent: ['updateDelivery', function(callback, results) {
          console.log("wooooooot we got an update")
          // Update user via socket
          var delivery = results.getDelivery
          switch (res.body.kind) {
            case "event.delivery_status":
              break;
            case "event.delivery_deadline":
              break;
            case "event.courier_update":
              break;
            case "event.delivery_return":
              break;
            default:
              // Shouldn't happen
              break;
          }
        }], function(err, results) {
            if (err)
              return res.send(err)
            res.status(200).end()
        }
      })
    })
};
