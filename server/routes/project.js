const router = require('koa-router')();

const msSqlDb = require('../databases/msSqlDb');

// 项目添加
router.post('/api/project/add', async (ctx, next) => {
    const info = ctx.request.body.info,
        people = ctx.request.body.people,
        moduleList = ctx.request.body.moduleList,
        versionList = ctx.request.body.versionList,
        status = ctx.request.body.status,
        id = new Date().getTime().toString();
    const modules = [];
    const inOrderRoot = function (node, pid) {
        if (node) {
            modules.push({
                title: node.title,
                id: id + node.nodeKey,
                pid: id + pid
            });
            if (node.children && node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    inOrderRoot(node.children[i], node.nodeKey);
                }
            }
        }
    };
    const responseBody = {
        status: 0,
        data: {}
    };
    try {
        const resultInfo = await msSqlDb.add({
            tableName: 'project',
            params: {
                id,
                title: info.title,
                share: info.share,
                projectDesc: info.desc,
                imgName: info.imgName,
                status: 1,
            }
        });
        if (resultInfo.err) throw result.err;
        const resultPeople = await msSqlDb.add({
            tableName: 'permission',
            params: people.map(item => {
                return {
                    userId: item.userId,
                    projectId: id,
                    permission: item.permission
                }
            })
        });
        if (resultPeople.err) throw result.err;
        inOrderRoot(moduleList[0], '');
        const resultModules = await msSqlDb.add({
            tableName: 'module',
            params: modules
        });
        if (resultModules.err) throw result.err;
        const resultVersion = await msSqlDb.add({
            tableName: 'version',
            params: versionList.map((item, index) => {
                return {
                    sortId: index,
                    title: item.title,
                    versionDesc: item.desc,
                    pid: id
                }
            })
        });
        if (resultVersion.err) throw result.err;
        responseBody.status = 1;
    } catch (e) {
        console.error(e);
        responseBody.status = 0;
    }
    ctx.body = responseBody;
});

// 项目查看
router.post('/api/project/index', async (ctx, next) => {
    const id = ctx.request.body.userId;
    const responseBody = {
        status: 0,
        data: []
    };
    const getTree = function (data, pid) {
        let itemArr = [];
        for (let i = 0; i < data.length; i++) {
            let node = data[i];
            if (node.pid.trim() === pid) {
                let newNode = {
                    expand: true,
                    title: node.title.trim(),
                    children: getTree(data, node.id)
                };
                itemArr.push(newNode);
            }
        }
        return itemArr;
    };
    try {
        const resultInfo = await msSqlDb.findAll({
            displayColumns: `id, title, share, projectDesc as 'desc', imgName, status, permission`,
            tableName: 'permission, project',
            whereSql: `permission.projectId = project.id AND permission.userId = '${id}'`
        });
        if (resultInfo.err) throw result.err;
        for (let i = 0; i < resultInfo.rows.length; i++) {
            const pid = resultInfo.rows[i].id;
            const resultPeople = await msSqlDb.findAll({
                displayColumns: `permission.userId, userName, userEmail, userDesc, userAvatar, permission`,
                tableName: 'permission, [dbo].[user]',
                whereSql: `permission.userId = [dbo].[user].userId AND permission.projectId = '${pid}'`
            });
            if (resultPeople.err) throw result.err;
            const resultModules = await msSqlDb.findAll({
                displayColumns: `id, title, pid`,
                tableName: 'module',
                whereSql: `id like '${pid}%'`
            });
            if (resultModules.err) throw result.err;
            const resultVersions = await msSqlDb.findAll({
                displayColumns: `title, sortId, versionDesc`,
                tableName: 'version',
                whereSql: `pid = '${pid}' ORDER BY sortId ASC`
            });
            if (resultVersions.err) throw result.err;
            responseBody.data.push({
                info: {
                    id: resultInfo.rows[i].id,
                    title: resultInfo.rows[i].title.trim(),
                    share: resultInfo.rows[i].share,
                    desc: resultInfo.rows[i].desc.trim(),
                    imgName: resultInfo.rows[i].imgName.trim()
                },
                people: resultPeople.rows.map(item => {
                    return {
                        userId: item.userId.toString().trim(),
                        name: item.userName.trim(),
                        email: item.userEmail.trim(),
                        desc: item.userDesc,
                        avatarId: (item.userAvatar || '').trim(),
                        permission: item.permission,
                        issue: 0, dispense: 0, solve: 0, test: 0,
                    }
                }),
                moduleList: getTree(resultModules.rows, pid),
                versionList: resultVersions.rows.map(item => {
                    return {
                        title: item.title.trim(),
                        desc: item.versionDesc.trim()
                    }
                }),
                status: resultInfo.rows[i].status === 1
                    ? (resultInfo.rows[i].permission[1] === '1' ? 0 : 1)
                    : resultInfo.rows[i].status
            })
        }
        responseBody.status = 1;
    } catch (e) {
        responseBody.status = 0;
        console.error(e);
    }
    ctx.body = responseBody;
});

module.exports = router;