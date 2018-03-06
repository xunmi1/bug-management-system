import Vue from 'vue';
import Router from 'vue-router';

import TheIndex from '@/TheIndex';
import TheHomeInput from '@/index/TheHomeInput';
import TheLoginInput from '@/index/TheLoginInput';
import TheRegisterInput from '@/index/TheRegisterInput';
import TheMain from '@/TheMain';
import TheProject from '@/TheProject';
import TheUserInfo from '@/TheUserInfo';
import TheNewProject from '@/project/TheNewProject';
import ProjectInfo from '@/project/ProjectInfo';
import ProjectPeople from '@/project/ProjectPeople';
import ProjectModules from '@/project/ProjectModules';
import ProjectVersions from '@/project/ProjectVersions';

import store from '../store';

Vue.use(Router);

const router = new Router({
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
            path: '/:userName',
            name: 'main',
            component: TheMain,
            children: [
                {
                    path: 'project/user',
                    name: 'userProject',
                    component: TheProject,
                    alias: 'project'
                },
                {
                    path: 'project/new',
                    name: 'newProject',
                    component: TheNewProject
                },
                {
                    path: 'project/info',
                    name: 'projectInfo',
                    component: ProjectInfo
                },
                {
                    path: 'project/people',
                    name: 'projectPeople',
                    component: ProjectPeople
                },
                {
                    path: 'project/modules',
                    name: 'projectModules',
                    component: ProjectModules
                },
                {
                    path: 'project/versions',
                    name: 'projectVersions',
                    component: ProjectVersions
                },
                {
                    path: 'user',
                    name: 'user',
                    component: TheUserInfo
                },
                {
                    path: 'console',
                    name: 'console'
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    const isOpen = (
        to.name === '' || to.name === 'home' || to.name === 'login' || to.name === 'register' ||
        from.name === 'home'
    );
    if (isOpen) {
        next();
    } else {
        // 如果本地有 token，进行验证，否则，转到 index 界面
        if (store.state.user.token) {
            // 发送本地数据，返回用户信息
            store.dispatch('getInfo').then(res => {
                // 开发调试模式，不进行拦截
                to.params.userName = '123456';
                if (to.params.userName === res) {
                    next();
                } else {
                    console.log('校验失败，进行拦截');
                    next('/');
                }
            })
        } else {
            console.log('用户拦截');
            next('/');
        }
    }
});

export default router;
