import Vue from 'vue';
import Router from 'vue-router';
import TheIndex from '@/components/TheIndex';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'TheIndex',
            // 注册将使用的组件（局部注册），只在父组件可用
            component: TheIndex
        }
    ]
});
