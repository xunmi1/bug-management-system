const state = {
    issueInfo: {
        id: '',
        title: '',
        select: 'bug',
        severity: 2,
        version: '',
        project: '',
        module: '',
        text: ''
    },
    issuePlan: {
        issuer: '',
        dispense: '',
        developer: '',
        tester: '',
        handle: '',
        priority: 2,
        versionEnd: '',
        dateState: new Date(),
        dateEnd: ''
    }
};

const mutations = {
    setIssueInfo(state, info) {
        state.issueInfo = info;
    },
    setIssuePlan(state, info) {
        state.issuePlan = info;
    }
};

const actions = {};

const issue = {
    state,
    mutations,
    actions
};

export default issue;
