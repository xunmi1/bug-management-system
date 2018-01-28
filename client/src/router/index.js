import Vue from 'vue';
import Router from 'vue-router';

import TheIndex from '@/TheIndex';
import TheHomeInput from '@/TheHomeInput';
import TheLoginInput from '@/TheLoginInput';
import TheRegisterInput from '@/TheRegisterInput';
import TheMain from '@/TheMain';
import TheProject from '@/TheProject';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            // 注册将使用的组件（局部注册），只在父组件可用
            component: TheIndex,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: TheHomeInput,
                    // 别名，访问 / 时转向 /home, 且 url 不变。不同于重定向
                    alias: '/'
                },
                {
                    path: 'login',
                    name: 'login',
                    component: TheLoginInput
                },
                {
                    path: 'register',
                    name: 'register',
                    component: TheRegisterInput
                }
            ]
        },
        {
            path: '/main',
            name: 'main',
            component: TheMain,
            children: [
                {
                    path: 'project',
                    name: 'project',
                    component: TheProject
                }
            ]
        }
    ]
});
