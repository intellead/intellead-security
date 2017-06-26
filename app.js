var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.post('/login', function (req, res) {
    var body = req.body;
    //if (!body) return res.sendStatus(400);
    console.log(req.body);
    res.sendStatus(200);
});

app.post('/registerUser', function (req, res) {
    var body = req.body;
    //if (!body) return res.sendStatus(400);
    console.log(req.body);
    // var dao = new Dao();
    // dao.saveAndUpdate(lead, function (err, result) {
    //     if (err) {
    //         return res.sendStatus(400);
    //     }
    //     res.sendStatus(200);
    // });
    res.sendStatus(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
