const router = require('koa-router')();
const msSqlDb = require('../databases/msSqlDb');

router.post('/api/login', async (ctx, next) => {
    console.log(ctx.request.body);
    let name = ctx.request.body.username || '',
        password = ctx.request.body.password || '';

    let result = await msSqlDb.getLoginData({name});

    if (!result) {
        ctx.body = "false";
    } else {
        if (password === result.userPwd.trim()) {
            console.log(`用户 ${name}: 登录成功`);
            ctx.body = "true";
        } else {
            console.log(`用户 ${name}: 登录失败`);
            ctx.body = "false";
        }
    }
});

module.exports = router;
