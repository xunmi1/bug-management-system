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
        localStating: '', // 当前页面判断依据
        dbStating: '' // 将在后台判断用户是否同时在线
    }
};

const mutations = {
    setUserName(state, info) {
        state.user.name = info.name;
    },
    setUserPwd(state, info) {
        state.user.pwd = info.pwd;
    },
    setUserLocalStating(state, info) {
        state.user.localStating = info.localStating;
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
                if (!state.user.dbStating) {
                    context.commit('setUserLocalStating', {
                        localStating: response.data
                    });
                }
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
