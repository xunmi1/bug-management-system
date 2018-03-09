const state = {
    issueList: []
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
