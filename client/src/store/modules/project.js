const state = {
    defaultIndex: 0, //选中项目的索引号
    projectList: [{
        info: {
            id: '',
            title: '测试内容测试内容',
            desc: '测试内容\n测试内容\n测试内容\n测试内容\n测试内容\n测试内容',
            imgName: ''
        },
        people: {
            allList: [
                {
                    userId: '14522683', name: '测试1', email: '1@cc.cc', desc: '', avatarId: '',
                    issue: 10, dispense: 6, solve: 0, test: 0
                },
                {
                    userId: '14522684', name: '测试2', email: '2@cc.cc', desc: '', avatarId: '',
                    issue: 0, dispense: 0, solve: 8, test: 0
                },
                {
                    userId: '14522685', name: '测试3', email: '2@cc.cc', desc: '', avatarId: '',
                    issue: 0, dispense: 0, solve: 0, test: 5
                },
                {
                    userId: '14522682', name: 'admin', email: '3@cc.cc', desc: '', avatarId: '',
                    issue: 0, dispense: 0, solve: 0, test: 0
                }
            ],                     // 项目成员
            ownerList: [
                {userId: '14522682', name: 'admin', email: '3@cc.cc', desc: '', avatarId: ''}
            ],                     // 管理人员
            issuerList: [
                {userId: '14522683', name: '测试1', email: '1@cc.cc', desc: '', avatarId: ''}
            ],                     // 提交人员
            developerList: [
                {userId: '14522684', name: '测试2', email: '2@cc.cc', desc: '', avatarId: ''}
            ],                     // 解决人员
            dispenseList: [
                {userId: '14522683', name: '测试1', email: '1@cc.cc', desc: '', avatarId: ''}
            ],                     // 分配人员
            testerList: [
                {userId: '14522685', name: '测试3', email: '2@cc.cc', desc: '', avatarId: ''}
            ]                      // 测试人员
        },
        modules: {},
        versionList: [1, 1.1, 1.2, 2],
        issueList: []
    }]
};

const mutations = {
    setProjectInfo(state, info) {
        state.projectList[state.defaultIndex].info.title = info.title;
        state.projectList[state.defaultIndex].info.desc = info.desc;
        state.projectList[state.defaultIndex].info.imgName = info.imgName;
    },
    pushProject(state, item) {
        item = Object.assign({}, item);
        state.projectList.push(item);
    }
};

const project = {
    state,
    mutations
};

export default project;
