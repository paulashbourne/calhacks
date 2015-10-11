var User = require('./model/user')
var Item = require('./model/item')
var Facility = require('./model/facility')
var async = require('async')

var Postmates = require('postmates')
var CUSTOMER_ID = "cus_KVBJk15W29az5-";
if (true) {
  // TEST KEY
  var API_KEY = "cd58846d-65ed-453f-86e7-84501be458d5";
} else {
  // LIVE KEY
  var API_KEY = "cd58846d-65ed-453f-86e7-84501be458d5";
}
var postmates = new Postmates(CUSTOMER_ID, API_KEY)

exports.pickup = function(user, item, facility, next) {
  var delivery = {
    manifest: item.title,
    pickup_name: user.first_name + "'s House",
    pickup_address: user.street_address + ', ' + user.city + ', ' + user.state,
    pickup_phone_number: user.phone,
    dropoff_name: facility.name,
    dropoff_address: facility.address,
    dropoff_phone_number: "4155796833",
    dropoff_notes: exports.generate_notes(facility.name),
    quote_id: item.quote_id
  }
  postmates.new(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}

exports.dropoff = function(user, item, facility, next) {
  var delivery = {
    manifest: item.title,
    dropoff_name: user.first_name + "'s House",
    dropoff_address: user.street_address + ', ' + user.city + ', ' + user.state,
    dropoff_phone_number: user.phone,
    pickup_name: facility.name,
    pickup_address: facility.address,
    pickup_phone_number: "4155796833",
    dropoff_notes: exports.generate_notes(user, item),
    quote_id: item.quote_id
  }
  postmates.new(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}

exports.generate_pickup_quote = function(user, item, facility, next) {
  var delivery = {
    pickup_address: user.street_address + ', ' + user.city + ', ' + user.state,
    dropoff_address: facility.address
  }

  postmates.quote(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}

exports.generate_dropoff_quote = function(user, item, facility, next) {
  var delivery = {
    dropoff_address: user.street_address + ', ' + user.city + ', ' + user.state,
    pickup_address: facility.address
  }

  postmates.quote(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}

exports.generate_notes = function(facility) {
  return "The facility is called " + facility
}
