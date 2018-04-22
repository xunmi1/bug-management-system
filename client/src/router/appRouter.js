import TheIndex from '@/TheIndex';
import TheMain from '@/TheMain';

const appRouter = {
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
                    component: resolve => {
                        require(['@/index/TheHomeInput'], resolve);
                    },
                    // 别名，访问 / 时转向 /home, 且 url 不变。不同于重定向
                    alias: '/'
                },
                {
                    path: 'login',
                    name: 'login',
                    component: resolve => {
                        require(['@/index/TheLoginInput'], resolve);
                    }
                },
                {
                    path: 'register',
                    name: 'register',
                    component: resolve => {
                        require(['@/index/TheRegisterInput'], resolve);
                    }
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
                    component: resolve => {
                        require(['@/MyProject'], resolve);
                    },
                    alias: 'project'
                },
                {
                    path: 'project/new',
                    name: 'newProject',
                    component: resolve => {
                        require(['@/project/TheNewProject'], resolve);
                    }

                },
                {
                    path: 'project/info',
                    name: 'projectInfo',
                    component: resolve => {
                        require(['@/project/ProjectInfo'], resolve);
                    }
                },
                {
                    path: 'project/people',
                    name: 'projectPeople',
                    component: resolve => {
                        require(['@/project/ProjectPeople'], resolve);
                    }
                },
                {
                    path: 'project/modules',
                    name: 'projectModules',
                    component: resolve => {
                        require(['@/project/ProjectModules'], resolve);
                    }
                },
                {
                    path: 'project/versions',
                    name: 'projectVersions',
                    component: resolve => {
                        require(['@/project/ProjectVersions'], resolve);
                    }
                },
                {
                    path: 'user',
                    name: 'user',
                    component: resolve => {
                        require(['@/TheUserInfo'], resolve);
                    }
                },
                {
                    path: 'view/project',
                    name: 'viewProject',
                    component: resolve => {
                        require(['@/views/ViewProject'], resolve);
                    },
                    alias: 'view'
                },
                {
                    path: 'view/issue',
                    name: 'viewIssue',
                    component: resolve => {
                        require(['@/views/ViewIssue'], resolve);
                    }
                },
                {
                    path: 'view/dispense',
                    name: 'setDispense',
                    component: resolve => {
                        require(['@/views/SetDispense'], resolve);
                    }
                },
                {
                    path: 'view/developer',
                    name: 'setDeveloper',
                    component: resolve => {
                        require(['@/views/SetDeveloper'], resolve);
                    }
                },
                {
                    path: 'view/tester',
                    name: 'setTester',
                    component: resolve => {
                        require(['@/views/SetTester'], resolve);
                    }
                }
            ]
        }
    ]
};

export default appRouter;
