const router = require('koa-router')();
const jwt = require('jsonwebtoken');

const msSqlDb = require('../databases/msSqlDb');
const tokenSecret = require('../config/tokenSecret');

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
    ctx.body = responseBody;
    if (!result) {
        responseBody.status = 0;
    } else {
        if (password !== result.userPwd.trim()) {
            console.log(`用户 ${name}: 登录失败`);
            responseBody.status = 1;
        } else {
            const payload = {
                userId: result.userId.trim(),
                userName: result.userName.trim()
            };
            //token签名 有效期为5小时
            const token = jwt.sign(payload, tokenSecret.value, {expiresIn: '5h'});
            console.log(`用户 ${name}: 登录成功`);
            responseBody.status = 3;
            responseBody.token = token;
        }
    }
});

// 验证身份
router.post('/api/check', async (ctx, next) => {
    const responseBody = {
        status: 0, // 0: 用户不存在，1: 密码错误，2: 同时登录，3: 登录成功
        token: ''
    };
    ctx.body = responseBody;
    const userToken = ctx.request.header.cookie.slice(10);
    console.log(userToken);
    // 验证 payload，获取用户名和 id
    await jwt.verify(userToken, tokenSecret.value, {algorithms: ['HS256']}, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // 由于 decoded = undefined, 因此使用非验证的 decode() 获取
                const decoded = jwt.decode(userToken);
                const payload = {
                    userId: decoded.userId,
                    userName: decoded.userName
                };
                responseBody.status = 3;
                responseBody.token = jwt.sign(payload, tokenSecret.value, {expiresIn: '5h'});
                console.log('用户身份过期，重新发放');
            } else {
                ctx.response.status = 401;
            }
        } else {
            responseBody.status = 3;
            responseBody.token = userToken;
            console.log('用户身份正常');
        }
    });
});

module.exports = router;
