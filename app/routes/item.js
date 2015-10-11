var Item = require('../model/item');
var postmates = require('../postmates')
var async = require('async')

module.exports = function(router) {
  router.route('/items')
    .post(function(req, res) {
      var params = req.body;
      var item = new Item(params);
      item.save(function(err) {
        if (err)
          res.send(err);
        res.json(item);
      });
    })
    .get(function(req, res) {
      Item.find(function(err, items) {
        if (err)
          res.send(err);
        res.json(items);
      });
    })

  router.route('/items/:id')
    .get(function(req, res) {
      Item.findById(req.params.id, function(err, item) {
        if (err)
          res.send(err);
        res.json(item);
      });
    })
    .put(function(req, res) {
      var params = req.body;
      Item.findById(req.params.id, function(err, item) {
        if (err)
          res.send(err);
        _.extend(item, params);
        user.save(function(err) {
          if (err)
            res.send(err);
          res.json(item);
        });
      });
    });

  router.route('/items/:id/pickup')
    .post(function(req, res) {
      async.auto({
        getItem: function(callback) {
          Item.findById(req.params.id, callback)
        },
        getFacility: ['getItem', function(callback, results) {
          Facility.findById(results.getItem.facility_id.toString())
        }],
        getUser: ['getItem', function(callback, results) {
          User.findById(results.getItem.user_id, callback)
        }],
        pickup: ['getUser', 'getFacility', function(callback, results) {
          postmates.pickup(results.getUser, results.getItem, results.getFacility, callback)
        }]
      }, function(err, res) {
          if (err)
            return res.send(err)
          res.json(res)
      })
    });

    router.route('/items/:id/quote')
    .post(function(req, res) {
      async.auto({
        getItem: function(callback) {
          Item.findById(req.params.id, callback)
        },
        getFacility: ['getItem', function(callback, results) {
          Facility.findById(results.getItem.facility_id.toString())
        }],
        getUser: ['getItem', function(callback, results) {
          User.findById(results.getItem.user_id, callback)
        }],
        quote: ['getUser', 'getFacility', function(callback, results) {
          postmates.generate_quote(resuts.getUser, results.getItem, results.getFacility, callback)
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
};
