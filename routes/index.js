var express = require('express');
var router = express.Router();
var feed = require("feed-read");
var json = {};
var cAndCFeed = "http://www.calendarwiz.com/calendars/rssfeeder.xml?crd=cityofhonolulu&len=200&days=30&events=100&title=Calendar%20Events&cat=87163";
/* GET home page. */
router.get('/', function(req, res, next) {

  feed(cAndCFeed, function(err, articles){
        if (err)
          throw err;
        articles.forEach(function(entry) {
          var info = entry.title;
          var location = info.substring(info.lastIndexOf("@ ") + 2, info.length);
          console.log(location);
        });
      });

  res.render('index', { title: 'Express' });
});
router.get('/json', function(req, res, next) {
  json.feeds = {};
  json.temp = "test";
  res.send(json);
});

module.exports = router;
