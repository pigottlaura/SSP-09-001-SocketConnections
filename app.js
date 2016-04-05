var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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

app.newSocketConnection = function(socket){
    var io = app.get("io");
    
    console.log("New user connected to the chat");
    
    socket.on("send message", function(messageData){
        var currentTime = new Date();
        var dateSentData = function(){
            var result = "";
            result += currentTime.getDate() < 10 ? "0" : "";
            result += currentTime.getDate();
            result += "/";
            result += currentTime.getMonth() < 9 ? "0" : "";
            result += currentTime.getMonth() + 1;
            result += "/";
            result += currentTime.getFullYear();
            
            return result;
        };
        var timeSentData = function(){
            var result = "";
            result += currentTime.getHours() < 13 ? currentTime.getHours() : currentTime.getHours() - 12;
            result += ":"
            result += currentTime.getMinutes() < 10 ? "0" : "";
            result += currentTime.getMinutes();
            result += ":"
            result += currentTime.getSeconds() < 10 ? "0" : "";
            result += currentTime.getSeconds();
            result += currentTime.getHours() < 12 ? " am" : " pm";
            return result;
        };
        
        console.log("New message from " + messageData.username + " - " + messageData.message);
        io.emit("new message", {
            username: messageData.username,
            message: messageData.message,
            dateSent: dateSentData(),
            timeSent: timeSentData()
        });
    });
    
;}

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


module.exports = app;
