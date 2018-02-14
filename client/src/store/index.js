import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import user from './modules/user';
import tagState from './modules/tagState';
import issue from './modules/issue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        tagState,
        issue
    },
    plugins: [createLogger()]
});

export default store;
