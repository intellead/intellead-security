'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router();
var app = express();
var LoginService = require('./src/LoginService');
var Dao = require('./src/Dao');
var User = require('./src/User');

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    next();
});

app.use('/', router);

app.post('/login', function(req, res, next) {
    var user = new User(req.body.email, req.body.password);
    new Dao().findUser(user, function (err, result) {
        if (err) {
            return res.sendStatus(400);
        }
        if (result) {
            new LoginService().generateToken(user.email, user.password, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(400);
                }
                if (result) {
                    return res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(401);
        }
    });
});

router.get('/login', function(req, res, next) {
    res.sendStatus(200);
});

app.post('/registerUser', function (req, res) {
    var user = new User(req.body.email, req.body.password, req.body.name);
    new Dao().saveUser(user, function (err, result) {
        if (err) {
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

router.get('/registerUser', function(req, res, next) {
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
