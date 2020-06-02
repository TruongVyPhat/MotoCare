const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const userRouter = require('./api/users/UserRoutes');
const authRouter = require('./api/auth/AuthRoutes');
// const roleRouter = require('./api/roles/RoleRoutes');
const productRouter = require('./api/products/ProductRoutes');
const categoryRouter = require('./api/categories/CategoryRoutes');
const brandRouter = require('./api/brand/BrandRouters');
const serviceRouter = require('./api/services/ServiceRouters');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
// app.use('/api/roles', roleRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/services', serviceRouter);

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

// set port
app.listen(9000,function() {
  console.log('----Hello Tiger Tran----');
});

module.exports = app;
