const router = require('koa-router')();
const msSqlDb = require('../databases/msSqlDb');
const jwt = require('jsonwebtoken');

const secret = 'bug';
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
            let userToken = {
                name
            };
            //token签名 有效期为1小时
            const token = jwt.sign(userToken, secret, {expiresIn: '1h'});
            console.log(`用户 ${name}: 登录成功`);
            responseBody.status = 3;
            responseBody.token = token;
            ctx.body = responseBody;
        }
    }
});

module.exports = router;
