var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/login", require('./routes/users'))
app.use("/api/goods", require('./routes/goods'))
app.use("/api/rgs", require('./routes/rgs'))


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



app.use(function (err, req, res, next) {
  console.log('sendFile')
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  if (req.url.includes('/api')) {// 用户端接口不存在 返回  {err:1,msg:'不存在的接口'}
    res.send({ err: 1, msg: '不存在的接口' })
  } else if (req.url.includes('/admin')) {// 管理端接口不存在 返回  res.render('error.ejs')
    res.render('error');
  } else { // 资源托管没有对应的页面 返回 404.html

    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  }


});





// error handler

module.exports = app;
