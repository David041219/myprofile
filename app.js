var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mime = require('mime-types');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
///
app.get('/.well-known/acme-challenge/1EVN8-iv3faOa-P44tCAt8Z-Ho4j1gghZkf_5Lco_Kg', function(req, res, next) {
  var filepath="./public/files/1EVN8-iv3faOa-P44tCAt8Z-Ho4j1gghZkf_5Lco_Kg";
  console.log(filepath);

  var mimetype=mime.lookup("1EVN8-iv3faOa-P44tCAt8Z-Ho4j1gghZkf_5Lco_Kg");
  console.log(mimetype);
  ///////////
  
  //res.send('hihihihihihi');
  res.setHeader('Content-disposition', 'attachment;filename='+'1EVN8-iv3faOa-P44tCAt8Z-Ho4j1gghZkf_5Lco_Kg');
  res.setHeader('Content-type', mimetype);

  var filestream=fs.createReadStream(filepath);
  filestream.pipe(res);
});

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



const port = 5000;
const myip ="0.0.0.0";
app.listen(port,myip,function(){
    console.log("local host has been opened succesfully \n"+port);
});




module.exports = app;
