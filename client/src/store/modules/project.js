const state = {
    //选中项目的索引号，-1: 没有默认项目
    defaultIndex: 0,
    projectList: [
        {
            info: {
                id: '11111110',
                title: '测试内容测试内容',
                desc: '测试内容\n测试内容\n测试内容\n测试内容\n测试内容\n测试内容',
                imgName: ''
            },
            people: [
                {
                    userId: '11111111', name: '123456', email: '3@cc.cc', desc: '', avatarId: '',
                    issue: 6, dispense: 2, solve: 5, test: 2,
                    // 项目成员 管理 提交 分配 解决 测试
                    permission: '111111'
                },
                {
                    userId: '14522683', name: '测试1', email: '1@cc.cc', desc: '', avatarId: '',
                    issue: 12, dispense: 0, solve: 0, test: 0,
                    permission: '101000'
                },
                {
                    userId: '14522684', name: '测试2', email: '2@cc.cc', desc: '', avatarId: '',
                    issue: 0, dispense: 20, solve: 0, test: 0,
                    permission: '100100'
                },
                {
                    userId: '14522685', name: '测试3', email: '3@cc.cc', desc: '', avatarId: '',
                    issue: 0, dispense: 0, solve: 8, test: 0,
                    permission: '100010'
                },
                {
                    userId: '14522686', name: '测试4', email: '4@cc.cc', desc: '', avatarId: '',
                    issue: 0, dispense: 0, solve: 0, test: 5,
                    permission: '100001'
                }
            ],
            moduleList: [{
                title: '测试模块',
                expand: true,
                children: [
                    {
                        title: 'parent 1-1',
                        children: [{title: 'leaf 1-1-1'}, {title: 'leaf 1-1-2'}]
                    },
                    {
                        title: 'parent 1-2',
                        children: [{title: 'leaf 1-2-1'}, {title: 'leaf 1-2-2'}]
                    },
                    {
                        title: 'parent 1-3'
                    }
                ]
            }],
            versionList: [
                {title: '1.0.1', desc: '测试内容1'},
                {title: '1.0.2', desc: '测试内容2'},
                {title: '1.1.1', desc: '测试内容3'},
                {title: '1.1.5', desc: '测试内容4'},
                {title: '1.2.0', desc: '测试内容5'}
            ],
            issueList: [],
            // 0：拥有，1：参与，2：关闭，3：删除（7 天内）
            status: 0
        },
        {
            info: {
                id: '11111111',
                title: '测试1',
                desc: '测试内容\n测试内容\n测试内容\n测试内容\n测试内容\n测试内容',
                imgName: ''
            },
            issueList: [],
            status: 1
        },
        {
            info: {
                id: '11111112',
                title: '测试2',
                desc: '测试内容\n测试内容\n测试内容\n测试内容\n测试内容\n测试内容',
                imgName: ''
            },
            status: 2
        },
        {
            info: {
                id: '11111113',
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
    changeProjectStatus(state, data) {
        const index = state.projectList.indexOf(data.project);
        state.projectList[index].status = data.toStatus;
    },
    pushProjectVersion(state, version) {
        state.projectList[state.defaultIndex].versionList.push(Object.assign({}, version));
    },
    pushProject(state, item) {
        state.projectList.push(JSON.parse(JSON.stringify(item)));
    },
    // 改变默认项目
    setDefaultIndex(state, project) {
        state.defaultIndex = state.projectList.indexOf(project);
    }
};

const project = {
    state,
    mutations
};

export default project;
