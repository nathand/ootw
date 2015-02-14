var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var app = express();

var feed = require("feed-read");
var rest = require('rest');
var cAndCFeed = "http://www.calendarwiz.com/calendars/rssfeeder.xml?crd=cityofhonolulu&len=200&days=30&events=100&title=Calendar%20Events&cat=87163";


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("dbOpen");
});
var postModel = require('./models/post');
var routes = require('./routes/index');

/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("dbOpen");
  var model = new postModel({
    link: "demo link",
    title: "demo title",
    description: "demo descrip"
  });
  feed(cAndCFeed, function(err, articles){
    if (err)
      throw err;
    articles.forEach(function(entry) {
      var newModel = new postModel({
        link: entry.link,
        info: entry.title,
        description: entry.description,
        lat: 0,
        lon: 0
      });
      newModel.save(function(err) {
        if(err) {
          console.log('save error', err);
        }
      });
    });
  });

});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

module.exports = app;
