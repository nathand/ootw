var express = require('express');
var router = express.Router();
var feed = require("feed-read");


/* GET home page. */
router.get('/', function(req, res, next) {

  feed("http://www.calendarwiz.com/calendars/rssfeeder.xml?crd=cityofhonolulu&len=200&days=30&events=100&title=Calendar%20Events&cat=87163", function(err, articles){
        if (err)
          throw err;
        articles.forEach(function(entry) {
          console.log(entry.title);
        });
      });

  res.render('index', { title: 'Express' });
});

module.exports = router;
