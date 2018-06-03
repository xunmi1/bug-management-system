import axios from "axios/index";

const state = {
    issueList: [
        {
            id: '12121211',
            title: '123',
            select: 'bug',
            severity: 2,
            version: '',
            project: '',
            module: '',
            text: '',
            issuer: '14522683',
            dispense: '14522684',
            developer: '11111111',
            tester: '',
            priority: 2,
            versionEnd: '',
            startDate: '',
            endDate: '',
            // 0: 待分配(解决)，1:待解决，2:待分配(测试)，3: 待测试，4: 完成，5: 已拒绝(关闭)，6：已延期
            status: 1
        },
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
            dispense: '14522684',
            developer: '14522685',
            tester: '11111111',
            priority: 2,
            versionEnd: '',
            startDate: '',
            endDate: '',
            status: 3
        }
    ]
};

const mutations = {
    pushIssue(state, issue) {
        state.issueList.push(issue);
    },
    setIssue(state, info) {
        state.issueList = JSON.parse(JSON.stringify(info));
    },
};

const actions = {
    async addIssue(context, info) {
        const res = await axios.post(process.env.API_HOST + '/issue/add', info);
        if (res.data.status) {
            context.commit('pushIssue', info);
        }
        return res.data;
    },

    async getIssue(context, info) {
        const res = await axios.post(process.env.API_HOST + '/issue/index', info);
        if (res.data.status) {
            context.commit('setIssue', res.data.data);
        } else {
            context.commit('setIssue', {});
        }
        return res.data;
    },

    async dispenseIssue(context, info) {
        const res = await axios.post(process.env.API_HOST + '/issue/dispense', info);
        return res.data;
    },

    async developerIssue(context, info) {
        const res = await axios.post(process.env.API_HOST + '/issue/developer', info);
        return res.data;
    },

    async testerIssue(context, info) {
        const res = await axios.post(process.env.API_HOST + '/issue/tester', info);
        return res.data;
    }
};

const issue = {
    state,
    mutations,
    actions
};

export default issue;
