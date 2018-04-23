const state = {
    issueList: [
        {
            id: '12121212',
            title: '123',
            select: 'bug',
            severity: 2,
            version: '',
            project: '',
            module: '',
            text: '',
            issuer: '11111111',
            dispense: '',
            developer: '',
            tester: '',
            priority: 2,
            versionEnd: '',
            startDate: '',
            endDate: '',
            // 0: 待分配(解决)，1:待解决，2:待分配(测试)，3: 待测试，4: 完成，5: 已拒绝(关闭)，6：延期中
            status: 1
        },
        {priority: 6,}, {priority: 5,}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {},
    ]
};

const mutations = {
    pushIssue(state, issue) {
        state.issueList.push(issue);
    }
};

const actions = {};

const issue = {
    state,
    mutations,
    actions
};

export default issue;
