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
            programmerList: [],
            issuerList: [],
            developerList: [],
            dispenseList: [],
            testerList: []
        },
        modules: {},
        versionList: [1, 1.1, 1.2, 2],
        issueList: []
    }],
    projectItem: {
        info: {
            id: '',
            title: '',
            desc: '',
            imgName: ''
        },
        people: {
            programmerList: [],    // 项目人员
            issuerList: [],    // 提交人员
            developerList: [],    // 解决人员
            dispenseList: [],    // 分配人员
            testerList: []    // 测试人员
        },
        modules: {},
        versionList: [],
        issueList: []
    }
};

const mutations = {
    setProjectInfo(state, info) {
        state.projectList[state.defaultIndex].info.title = info.title;
        state.projectList[state.defaultIndex].info.desc = info.desc;
        state.projectList[state.defaultIndex].info.imgName = info.imgName;
    },
    pushProject(state, item) {
        state.projectItem.info = item.info;
        state.projectItem.people = item.people;
        state.projectItem.modules = item.modules;
        state.projectItem.versionList = item.versionList;
        state.projectList.push(state.projectItem);
    }
};

const project = {
    state,
    mutations
};

export default project;
