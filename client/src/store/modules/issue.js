const state = {
    issueInfo: {
        title: '',
        select: 'bug',
        severity: 0,
        version: '',
        project: '',
        module: '',
        textarea: ''
    },
    issuePlan: {
        dispense: '',
        handle: '',
        priority: 2,
        versionEnd: '',
        dateState: '',
        dateEnd: ''
    }
};

const mutations = {};

const issue = {
    state,
    mutations
};

export default issue;
