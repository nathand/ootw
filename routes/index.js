var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var PostModel = require('../models/post');
var db = mongoose.connection;

var json = {};
var cAndCFeed = "http://www.calendarwiz.com/calendars/rssfeeder.xml?crd=cityofhonolulu&len=200&days=30&events=100&title=Calendar%20Events&cat=87163";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/event', function(req, res, next) {
  res.render('event', { title: 'event' });
});




router.get('/api/:y/:m/:d', function (req, res) {
  var date = req.params.y + "." + req.params.m + "." + req.params.d;
  var info;
  console.log(date);
  PostModel.find({info: {$regex :date + ".*"}}, function(err, results) {
    if (err) {
      res.send("[\"error\"]");
    }
    info = results;
    console.log(results);
    res.send(results);
  });
  //var results = mongoose.model('Post', )

});

module.exports = router;
