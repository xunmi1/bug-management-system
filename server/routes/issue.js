const router = require('koa-router')();

const msSqlDb = require('../databases/msSqlDb');

// 项目添加
router.post('/api/issue/add', async (ctx, next) => {
    const responseBody = {
        status: 0,
        data: {}
    };
    ctx.body = responseBody;
});


module.exports = router;