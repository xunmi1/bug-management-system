import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import axios from 'axios';
import qs from 'qs';

Vue.use(Vuex);

const state = {
    user: {
        name: '',
        pwd: '',
        stating: ''
    }
};

const mutations = {
    upUserName(state, info) {
        state.user.name = info.name;
    },
    upUserPwd(state, info) {
        state.user.pwd = info.pwd;
    },
    upUserStating(state, info) {
        state.user.stating = info.stating;
    },
};

const actions = {
    loginCheck(context) {
        axios.post('/api/login', qs.stringify({
            username: context.state.user.name,
            password: context.state.user.pwd
        }))
            .then((response) => {
                // console.log(response.data);
                context.commit('upUserStating', {
                    stating: response.data
                });
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    plugins: [createLogger()]
})
