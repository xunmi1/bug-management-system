const state = {
    defaultIndex: 0, //选中项目的索引号
    projectList: [
        {
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
            moduleList: [{
                title: '测试模块',
                children: [
                    {
                        title: 'parent 1-1',
                        children: [{title: 'leaf 1-1-1'}, {title: 'leaf 1-1-2'}]
                    },
                    {
                        title: 'parent 1-2',
                        children: [{title: 'leaf 1-2-1'}, {title: 'leaf 1-2-1'}]
                    }
                ]
            }],
            versionList: [
                {name: '1.0.1', desc: '测试内容1'},
                {name: '1.0.2', desc: '测试内容2'},
                {name: '1.1.1', desc: '测试内容3'},
                {name: '1.1.5', desc: '测试内容4'},
                {name: '1.2.0', desc: '测试内容5'}
            ],
            issueList: [],
            // 0：拥有，1：参与，2：关闭，3：删除（7 天内）
            status: 0
        },
        {
            info: {
                id: '',
                title: '测试1',
                desc: '测试内容\n测试内容\n测试内容\n测试内容\n测试内容\n测试内容',
                imgName: ''
            },
            issueList: [],
            status: 1
        },
        {
            info: {
                id: '',
                title: '测试2',
                desc: '测试内容\n测试内容\n测试内容\n测试内容\n测试内容\n测试内容',
                imgName: ''
            },
            status: 2
        },
        {
            info: {
                id: '',
                title: '测试3',
                desc: '测试内容\n测试内容\n测试内容\n测试内容\n测试内容\n测试内容',
                imgName: ''
            },
            status: 3
        }
    ]
};

const mutations = {
    setProjectInfo(state, info) {
        state.projectList[state.defaultIndex].info.title = info.title;
        state.projectList[state.defaultIndex].info.desc = info.desc;
        state.projectList[state.defaultIndex].info.imgName = info.imgName;
    },
    setProjectPeople(state, people) {
        state.projectList[state.defaultIndex].people = JSON.parse(JSON.stringify(people));
    },
    setProjectModuleList(state, modules) {
        state.projectList[state.defaultIndex].moduleList = JSON.parse(JSON.stringify(modules));
    },
    pushProjectVersion(state, version) {
        state.projectList[state.defaultIndex].versionList.push(Object.assign({}, version));
    },
    pushProject(state, item) {
        state.projectList.push(JSON.parse(JSON.stringify(item)));
    }
};

const project = {
    state,
    mutations
};

export default project;
