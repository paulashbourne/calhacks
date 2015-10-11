var Facility = require('../model/facility');

module.exports = function(router) {
  router.route('/facilities')
    .post(function(req, res) {
      var params = req.body;
      var facility = new Facility(params);
      facility.save(function(err) {
        if (err)
          res.send(err);
        res.json(facility);
      });
    })
    .get(function(req, res) {
      Facility.find(function(err, facilitys) {
        if (err)
          res.send(err);
        res.json(facilitys);
      });
    })

  router.route('/facilities/:id')
    .get(function(req, res) {
      Facility.findById(req.params.id, function(err, facility) {
        if (err)
          res.send(err);
        res.json(facility);
      });
    })
    .put(function(req, res) {
      var params = req.body;
      Facility.findById(req.params.id, function(err, facility) {
        if (err)
          res.send(err);
        _.extend(facility, params);
        user.save(function(err) {
          if (err)
            res.send(err);
          res.json(facility);
        });
      });
    });
};
