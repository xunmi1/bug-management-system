import axios from "axios/index";

const state = {
    //选中项目的索引号，-1: 没有默认项目
    defaultIndex: 0,
    projectList: [
        {
            info: {
                id: '11111110',
                title: '测试项目',
                share: true,
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
                nodeKey: 0,
                expand: true,
                children: [
                    {
                        title: 'parent 1-1',
                        nodeKey: 1,
                        children: [{title: 'leaf 1-1-1', nodeKey: 2}, {title: 'leaf 1-1-2', nodeKey: 3}]
                    },
                    {
                        title: 'parent 1-2',
                        nodeKey: 4,
                        children: [{title: 'leaf 1-2-1', nodeKey: 5,}, {title: 'leaf 1-2-2', nodeKey: 6,}]
                    },
                    {
                        title: 'parent 1-3',
                        nodeKey: 7,
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
            // 当前用户：0：拥有，1：参与，2：关闭，3：删除（7 天内）
            // 项目： 1：打开，2：关闭，3：删除（7 天内），具体是0或1 根据当前用户来判别
            status: 0
        },
        {
            info: {
                id: '11111111',
                title: '测试1',
                share: true,
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
                share: false,
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

const getters = {
// 管理人员
    ownerList: state => {
        return state.projectList[state.defaultIndex].people.filter(item => item.permission[1] === '1');
    },
    // 提交人员
    issuerList: state => {
        return state.projectList[state.defaultIndex].people.filter(item => item.permission[2] === '1');
    },
    // 分配人员
    dispenseList: state => {
        return state.projectList[state.defaultIndex].people.filter(item => item.permission[3] === '1');
    },
    // 解决人员
    developerList: state => {
        return state.projectList[state.defaultIndex].people.filter(item => item.permission[4] === '1');
    },
    // 测试人员
    testerList: state => {
        return state.projectList[state.defaultIndex].people.filter(item => item.permission[5] === '1');
    },
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
    },
    setProject(state, info) {
        state.projectList = JSON.parse(JSON.stringify(info));
    }
};

const actions = {
    async addProject(context, info) {
        const res = await axios.post(process.env.API_HOST + '/project/add', info);
        if (res.data.status) {
            context.commit('pushProject', info);
        }
        return res.data;
    },

    async getProject(context, info) {
        const res = await axios.post(process.env.API_HOST + '/project/index', info);
        if (res.data.status) {
            context.commit('setProject', res.data.data);
        } else {
            context.commit('setProject', {});
        }
    }
};

const project = {
    state,
    //getters,
    mutations,
    actions
};

export default project;
