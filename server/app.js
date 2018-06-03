// 导入 koa，koa2 导入的是一个 class，因此用大写的Koa表示
const Koa = require('koa');
//const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const staic = require('koa-static');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const jwtKoa = require('koa-jwt');

const tokenSecret = require('./config/tokenSecret');

const index = require('./routes/index');
const userControl = require('./routes/userControl');
const project = require('./routes/project');
const issue = require('./routes/issue');
const upload = require('./routes/upload');

// 创建一个 Koa 对象表示 web app 本身
const app = new Koa();

app.use(staic(__dirname, 'public'));
// bodypaser 要在 router 之前加载才能生效
app.use(bodyParser());
// app.use(router.routes());
// 以中间件形式绑定到路径上

// log request
app.use(logger());

app.use(cors({
    origin: 'http://localhost:8080',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(jwtKoa({
        secret: tokenSecret.value
    }).unless({
    path: [/^\/(?:api|public|user)\/*/]         // 数组中的路径不需要通过 jwt 验证
    })
);

app.use(index.routes());
app.use(userControl.routes());
app.use(project.routes());
app.use(issue.routes());
app.use(upload.routes());

// 监听端口
app.listen(8000);
console.log('app started at port 8000...');
