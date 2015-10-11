var Delivery = require('../model/delivery');
var User     = require('../model/user');
var _        = require('underscore');
var async    = require('async');

var http = require('http')
var io   = require('socket.io')(http)

module.exports = function(router) {
  router.route('/postmates')
    .post(function(req, res) {
      var params = req.body;
      async.auto({
        getDelivery: function(callback) {
          Delivery.findOne({'postmates_id':params.delivery_id}).exec(callback)
        },
        getUser : ['getDelivery', function(callback, results) {
          User.findById(results.getDelivery.user_id, callback);
        }],
        updateDelivery: ['getDelivery', function(callback, results) {
          var delivery = results.getDelivery;
          _.extend(delivery, {
            postmates_id    : params.delivery_id,
            state           : params.data.status,
            pickup_eta      : params.data.pickup_eta,
            dropoff_eta     : params.data.dropoff_eta,
            pickup_millis   : delivery.pickup_eta - Date.now(),
            dropoff_millis  : delivery.dropoff_eta - Date.now(),
            complete        : params.data.complete,
            courier         : params.data.courier
          });
          delivery.save(callback)
        }],
        handleEvent: ['getUser', 'updateDelivery', function(callback, results) {
          console.log("wooooooo we got an update")
          // Update user via socket
          var delivery = results.getDelivery
          switch (params.kind) {
            case "event.delivery_status":
              io.to(results.getUser.socket_id).emit('update', delivery);
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
          callback(results)
        }],
      },
      function(err, results) {
        if (err)
          return res.send(err)
        res.status(200).end()
      })
    })
};
