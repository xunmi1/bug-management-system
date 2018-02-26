const state = {
    projectList: [{
        info: {
            id: '',
            title: '',
            desc: '',
            imgName: ''
        },
        people: {
            programmerList: [],
            issuerList: [],
            developerList: [],
            dispenseList: [],
            testerList: []
        },
        versionList: [],
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
        versionList: [],
        issueList: []
    }
};

const mutations = {};

const project = {
    state,
    mutations
};

export default project;
