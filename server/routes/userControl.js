const router = require('koa-router')();
const jwt = require('jsonwebtoken');

const msSqlDb = require('../databases/msSqlDb');
const tokenSecret = require('../config/tokenSecret');

const secret = 'bug';

// 用户登录
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
            const payload = {
                userId: result.userId.trim(),
                userName: result.userName.trim()
            };
            //token签名 有效期为1小时
            const token = jwt.sign(payload, secret, {expiresIn: '1h'});
            console.log(`用户 ${name}: 登录成功`);
            responseBody.status = 3;
            responseBody.token = token;
            ctx.body = responseBody;
        }
    }
});
// 验证身份
router.post('/api/check', async (ctx, next) => {
    const userToken = ctx.request.header.cookie.slice(10);
    console.log(userToken);
    console.log(tokenSecret.value);
    // 解密 payload，获取用户名和 id
    //let payload = await jwt.verify(userToken, tokenSecret.value);
});
module.exports = router;
