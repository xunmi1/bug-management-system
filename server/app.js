// 导入koa，koa2 导入的是一个 class，因此用大写的Koa表示
const Koa = require('koa');
//const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const staic = require('koa-static');
const cors = require('koa2-cors');

const index = require('./routes/index');
const login = require('./routes/login')
// 创建一个Koa对象表示 web app 本身
const app = new Koa();

app.use(staic(__dirname, 'public'));
// bodypaser要在router之前加载才能生效
app.use(bodyParser());
// app.use(router.routes());
// 以中间件形式绑定到路径上

// log request URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*";
        }
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(index.routes());
app.use(login.routes());

// 监听端口
app.listen(8000);
console.log('app started at port 8000...');