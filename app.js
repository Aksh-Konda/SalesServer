require('dotenv/config');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');

var app = express();

const connect = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});

connect.then(db => {
  console.log('Connected correctly to server');
}, err => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'plugins')));
// app.use('/css', express.static(path.join(_dirname, 'node_modules/adminlte/dist/css')))
// app.use('/js', express.static(path.join(_dirname, 'node_modules/adminlte/dist/js')))
// app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist')))

app.use(ejsLayouts);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
