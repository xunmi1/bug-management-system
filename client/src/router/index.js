import Vue from 'vue';
import Router from 'vue-router';
import TheIndex from '@/components/TheIndex';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'TheIndex',
            component: TheIndex,
        },
    ],
});
