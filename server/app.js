// 导入koa，koa2 导入的是一个 class，因此用大写的Koa表示
const Koa = require('koa');
//const router = require('koa-router')();
//const bodyParser = require('koa-bodyparser');
const staic = require("koa-static");
const index = require('./routes/index');

// 创建一个Koa对象表示 web app 本身
const app = new Koa();

app.use(staic(__dirname, 'public'));
//app.use(bodyParser());
//app.use(router.routes());
// 以中间件形式绑定到路径上
app.use(index.routes());

// 监听端口
app.listen(8000);
console.log('app started at port 8000...');

// log request URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 对于任何请求，app 将调用该异步函数处理请求
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});