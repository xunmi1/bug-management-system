const router = require('koa-router')();

const msSqlDb = require('../databases/msSqlDb');

// 问题提交
router.post('/api/issue/add', async (ctx, next) => {
    const responseBody = {
        status: 0,
        data: {}
    };
    const data = Object.assign({}, ctx.request.body);
    data.id = new Date().getTime().toString();
    try {
        data.issueSelect = data.select;
        delete data.select;
        const result = await msSqlDb.add({
            tableName: 'issue',
            params: data
        });
        if (result.err) throw result.err;
        responseBody.status = 1;
    } catch (e) {
        responseBody.status = 0;
        console.log(e);
    }
    ctx.body = responseBody;
});

// 问题查看
router.post('/api/issue/index', async (ctx, next) => {
    const responseBody = {
        status: 0,
        data: {}
    };
    const id = ctx.request.body.id;
    try {
        const result = await msSqlDb.findAll({
            tableName: 'issue',
            whereSql: `project = '${id}'`
        });
        if (result.err) throw result.err;
        result.rows.forEach(item => {
            for (let index in item) {
                if (item.hasOwnProperty(index) && typeof item[index] === 'string') {
                    item[index] = item[index].trim();
                }
            }
            item.select = item.issueSelect;
            delete item.issueSelect;
        });
        responseBody.status = 1;
        responseBody.data = result.rows;
    } catch (e) {
        responseBody.status = 0;
        console.log(e);
    }
    ctx.body = responseBody;
});

router.post('/api/issue/dispense', async (ctx, next) => {
    const responseBody = {
        status: 0,
        data: {}
    };
    const data = ctx.request.body;
    data.issueSelect = data.select;
    delete data.select;
    try {
        let result = await msSqlDb.update({
            params: data,
            tableName: 'issue',
            whereSql: `id = '${data.id}'`
        });
        if (result.err) throw result.err;
        responseBody.status = 1;
    } catch (e) {
        responseBody.status = 0;
        console.log(e);
    }
    ctx.body = responseBody;
});

router.post('/api/issue/developer', async (ctx, next) => {
    const responseBody = {
        status: 0,
        data: {}
    };
    const data = ctx.request.body;
    data.issueSelect = data.select;
    delete data.select;
    const tmpData = JSON.parse(JSON.stringify(data));
    delete tmpData.issueName;
    delete tmpData.solveDesc;
    try {
        if (data.status === 2) {
            const result = await msSqlDb.update({
                params: tmpData,
                tableName: 'issue',
                whereSql: `id = '${data.id}'`
            });
            if (result.err) throw result.err;
            const id = new Date().getTime().toString();
            const resultSolution = await msSqlDb.add({
                tableName: 'solution',
                params: {
                    id,
                    issueId: data.id,
                    issueName: data.issueName,
                    solveDesc: data.solveDesc
                }
            });
            if (resultSolution.err) throw resultSolution.err;
        } else {
            const result = await msSqlDb.update({
                params: data,
                tableName: 'issue',
                whereSql: `id = '${data.id}'`
            });
            if (result.err) throw result.err;
        }
        responseBody.status = 1;
    } catch (e) {
        responseBody.status = 0;
        console.log(e);
    }
    ctx.body = responseBody;
});

router.post('/api/issue/tester', async (ctx, next) => {
    const responseBody = {
        status: 0,
        data: {}
    };
    const data = ctx.request.body;
    data.issueSelect = data.select;
    delete data.select;
    const tmpData = JSON.parse(JSON.stringify(data));
    delete tmpData.isClose;
    delete tmpData.testDesc;
    try {
        const result = await msSqlDb.update({
            params: tmpData,
            tableName: 'issue',
            whereSql: `id = '${data.id}'`
        });
        if (result.err) throw result.err;
        const resultSolution = await msSqlDb.update({
            tableName: 'solution',
            params: {
                isClose: data.isClose,
                testDesc: data.testDesc
            },
            whereSql: `issueId = '${data.id}'`
        });
        if (resultSolution.err) throw resultSolution.err;
        responseBody.status = 1;
    } catch (e) {
        responseBody.status = 0;
        console.log(e);
    }
    ctx.body = responseBody;
});

module.exports = router;
