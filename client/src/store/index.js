import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user
    },
    plugins: [createLogger()]
});

export default store;
