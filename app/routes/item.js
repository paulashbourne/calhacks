var Item = require('../model/item');

module.exports = function(router) {
  router.route('/item')
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
};
