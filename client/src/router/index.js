import Vue from 'vue';
import Router from 'vue-router';

import TheIndex from '@/TheIndex';
import TheHomeInput from '@/index/TheHomeInput';
import TheLoginInput from '@/index/TheLoginInput';
import TheRegisterInput from '@/index/TheRegisterInput';
import TheMain from '@/TheMain';
import MyProject from '@/MyProject';
import TheUserInfo from '@/TheUserInfo';
import ViewProject from '@/views/ViewProject';
import ViewIssue from '@/views/ViewIssue';
import SetDispense from '@/views/SetDispense';
import TheNewProject from '@/project/TheNewProject';
import ProjectInfo from '@/project/ProjectInfo';
import ProjectPeople from '@/project/ProjectPeople';
import ProjectModules from '@/project/ProjectModules';
import ProjectVersions from '@/project/ProjectVersions';

import store from '../store';
import VueCookie from 'vue-cookie';
import {Base64} from 'js-base64';

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
                    name: 'myProject',
                    component: MyProject,
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
                    path: 'view/project',
                    name: 'viewProject',
                    component: ViewProject,
                    alias: 'view'
                },
                {
                    path: 'view/issue',
                    name: 'viewIssue',
                    component: ViewIssue
                },
                {
                    path: 'view/dispense',
                    name: 'setDispense',
                    component: SetDispense
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    console.log('路由验证');
    let userToken = VueCookie.get('userToken');
    store.commit('setToken', userToken);
    const isOpen = (
        to.name === '' || to.name === 'home' || to.name === 'login' || to.name === 'register'
    );
    if (isOpen) {
        next();
    } else {
        // 如果本地有 token，进行验证，否则，转到 index 界面
        if (userToken) {
            // 发送本地数据，返回用户信息
            store.dispatch('userCheck').then(res => {
                if (res) {
                    // 更新 token 值
                    userToken = store.state.user.token;
                    const user = JSON.parse(Base64.decode(userToken.split('.')[1]));
                    if (to.params.userName === user.userName) {
                        next();
                    } else {
                        console.log('导航错误，进行拦截');
                        next('/');
                    }
                } else {
                    console.log('校验失败，进行拦截');
                    next('/');
                }
            })
        } else {
            console.log('用户拦截');
            // 用于预览，暂时取消拦截 next('/')
            to.params.userName = '123456';
            next();
        }
    }
});

export default router;
