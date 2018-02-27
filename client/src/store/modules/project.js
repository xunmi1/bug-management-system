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
            allList: [],           // 项目成员
            ownerList: [],         // 管理人员
            issuerList: [],        // 提交人员
            developerList: [],     // 解决人员
            dispenseList: [],      // 分配人员
            testerList: []         // 测试人员
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
