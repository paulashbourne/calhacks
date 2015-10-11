var Item      = require('../model/item')
var Delivery  = require('../model/delivery')
var postmates = require('../postmates')
var async = require('async')
var User = require('../model/user')
var Item = require('../model/item')
var Facility = require('../model/facility')
var mongoose = require('mongoose')
var _ = require('underscore')

module.exports = function(router) {
  router.route('/items')
    .post(function(req, res) {
      var params = req.body;
      var item = new Item(params);
      item.save(function(err) {
        if (err)
          return res.send(err);
        res.json(item);
      });
    })
    .get(function(req, res) {
      Item.find(function(err, items) {
        if (err)
          return res.send(err);
        res.json(items);
      });
    })

  router.route('/items/:id')
    .get(function(req, res) {
      Item.findById(req.params.id, function(err, item) {
        if (err)
          return res.send(err);
        res.json(item);
      });
    })
    .put(function(req, res) {
      var params = req.body;
      async.auto({
        getItem : function(callback) {
          Item.findById(req.params.id, callback);
        },
        updateItem : ['getItem', function(callback, results) {
          _.extend(results.getItem, params);
          results.getItem.save(callback);
        }]
      },
      function(err, results) {
        if (err) {
          return res.send(err);
        }
        res.json(results.getItem);
      });
    });

  router.route('/items/:id/image')
    .get(function(req, res) {
      Item.findById(req.params.id, function(err, item) {
        if (err)
          return res.send(err)
        res.contentType(item.images[0].contentType)
        res.send(item.images[0].data)
      });
    })

  router.route('/items/:id/pickup')
    .post(function(req, res) {
      async.auto({
        getItem: function(callback) {
          Item.findById(req.params.id, callback)
        },
        getFacility: ['getItem', function(callback, results) {
          Facility.findById(results.getItem.facility.toString(), callback)
        }],
        getUser: ['getItem', function(callback, results) {
          User.findById(results.getItem.user_id.toString(), callback)
        }],
        pickup: ['getUser', 'getFacility', function(callback, results) {
          postmates.pickup(results.getUser, results.getItem, results.getFacility, callback)
        }],
        saveDelivery: ['getUser', 'pickup', function(callback, results) {
          var params = results.pickup
          var delivery = new Delivery({
            user_id      : results.getUser.id,
            postmates_id : params.id,
            state        : params.status,
            pickup_eta   : params.pickup_eta,
            dropoff_eta  : params.dropoff_eta,
            complete     : params.complete,
            courier      : params.courier,
            items        : [req.params.id]
          })
          delivery.save(callback)
        }],
      }, function(err, results) {
          if (err)
            return res.send(err)
          res.json(results.pickup)
      })
    });

  router.route('/items/:id/dropoff')
    .post(function(req, res) {
      async.auto({
        getItem: function(callback) {
          Item.findById(req.params.id, callback)
        },
        getFacility: ['getItem', function(callback, results) {
          Facility.findById(results.getItem.facility.toString())
        }],
        getUser: ['getItem', function(callback, results) {
          User.findById(results.getItem.user_id, callback)
        }],
        pickup: ['getUser', 'getFacility', function(callback, results) {
          postmates.dropoff(results.getUser, results.getItem, results.getFacility, callback)
        }],
        saveDelivery: ['pickup', function(callback, results) {
          var params = results.pickup
          var delivery = new Delivery({
            postmates_id : params.id,
            state        : params.status,
            pickup_eta   : params.pickup_eta,
            dropoff_eta  : params.dropoff_eta,
            complete     : params.complete,
            courier      : params.courier,
            items        : [req.params.id]
          })
          delivery.save(callback)
        }],
      }, function(err, res) {
          if (err)
            return res.send(err)
          res.json(results.pickup)
      })
    });

    router.route('/items/:id/quotedropoff')
      .post(function(req, res) {
        async.auto({
          getItem: function(callback) {
            Item.findById(req.params.id, callback)
          },
          getFacility: ['getItem', function(callback, results) {
            Facility.findById(results.getItem.facility.toString(), callback)
          }],
          getUser: ['getItem', function(callback, results) {
            User.findById(results.getItem.user_id, callback)
          }],
          quote: ['getUser', 'getFacility', function(callback, results) {
            postmates.generate_dropoff_quote(results.getUser, results.getItem, results.getFacility, callback)
          }],
          save: ['quote', function(callback, results) {
            var item = results.getItem
            item.quote_id = results.quote.id
            item.save(function(err) {
              callback(err)
            })
          }]
        }, function(err, results) {
            if (err)
              return res.send(err)
            res.json(results.quote)
        })
      });
    router.route('/items/:id/quotepickup')
      .post(function(req, res) {
        async.auto({
          getItem: function(callback) {
            Item.findById(req.params.id, callback)
          },
          setFacility: ['getItem', function(callback, results) {
            var item = results.getItem
            item.facility = mongoose.Types.ObjectId("5619d121107d677233f4a51d")
            item.save(callback)
          }],
          getFacility: ['setFacility', function(callback, results) {
            Facility.findById("5619d121107d677233f4a51d", callback)
          }],
          getUser: ['getItem', function(callback, results) {
            User.findById(results.getItem.user_id, callback)
          }],
          quote: ['getUser', 'getFacility', function(callback, results) {
            postmates.generate_pickup_quote(results.getUser, results.getItem, results.getFacility, callback)
          }],
          save: ['quote', function(callback, results) {
            var item = results.getItem // Yeah
            item.quote_id = results.quote.id
            item.save(function(err) {
              callback(err)
            })
          }]
        }, function(err, results) {
            if (err)
              return res.send(err)
            res.json(results.quote)
        })
      })
};
