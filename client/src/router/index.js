import Vue from 'vue';
import Router from 'vue-router';
import TheIndex from '@/components/TheIndex';
import  TheThreeInput from '@/components/TheThreeInput';

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
                    path:'home',
                    name:'home',
                    component: TheThreeInput,
                    // 别名，访问 / 时转向 /home, 且 url 不变。不同于重定向
                    alias: '/'
                }
            ]
        }
    ]
});
