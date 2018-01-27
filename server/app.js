var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

/**
 * 通过express应用的http.verb，把中间件和路由路径上特定的HTTP方法绑定
 * view engine setup
 * 设置模板文件的存储位置和使用的模板引擎
 */
// 设置模板视图的目录
app.set('views', path.join(__dirname, 'views'));
// 设置是否启用视图编译缓存，提高服务器执行效率
app.set("view cache",true);
// 设置模板引擎的格式即运用何种模板引擎
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

/**
 * uncomment after placing your favicon in /public
 * 使用 express.static 中间件来设置静态文件路径
 * app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../dist')))

// 以中间件形式绑定到路径上
app.use('/', index);
app.use('/users', users);

/**
 * catch 404 and forward to error handler
 * 通过express应用的 use(...)，把中间件同路由路径上的所有HTTP方法绑定
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
