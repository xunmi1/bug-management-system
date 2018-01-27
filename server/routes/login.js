const router = require('koa-router')();
router.post('/api/login', async (ctx, next) => {
    console.log(ctx.request.body);
    let name = ctx.request.body.username || '',
        password = ctx.request.body.password || '';
    if (name === '123456' && password === '123456') {
        ctx.body = "true";
    } else {
        ctx.body = "false";
    }
});
module.exports = router;