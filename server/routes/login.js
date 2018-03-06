const router = require('koa-router')();
const msSqlDb = require('../databases/msSqlDb');

router.post('/api/login', async (ctx, next) => {
    console.log(ctx.request.body);
    let name = ctx.request.body.username || '',
        password = ctx.request.body.password || '';

    let result = await msSqlDb.getLoginData({name});
    const responseBody = {
        status: 0, // 0: 用户不存在，1: 密码错误，2: 同时登录，3: 登录成功
        token: ''
    };
    if (!result) {
        ctx.body = responseBody;
    } else {
        if (password !== result.userPwd.trim()) {
            console.log(`用户 ${name}: 登录失败`);
            responseBody.status = 1;
            ctx.body = responseBody;
        } else {
            console.log(`用户 ${name}: 登录成功`);
            responseBody.status = 3;
            responseBody.token = '12345678';
            ctx.body = responseBody;
        }
    }
});

module.exports = router;
