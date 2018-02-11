// require('koa-router')返回的是函数，需要()来调用函数
const router = require('koa-router')();
const mssqldb = require('../databases/mssqldb');
// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/index', async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
    mssqldb.getConnection();
});

module.exports = router;
