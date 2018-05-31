import Vue from 'vue';
import Router from 'vue-router';
import appRouter from './appRouter';
import store from '../store';
import VueCookie from 'vue-cookie';
import {Base64} from 'js-base64';

Vue.use(Router);

const router = new Router(appRouter);

router.beforeEach((to, from, next) => {
    let userToken = VueCookie.get('userToken');
    store.commit('setToken', userToken);
    const isOpen = (
        to.name === '' || to.name === 'home' || to.name === 'login' || to.name === 'register'
    );
    if (isOpen) {
        next();
    } else {
        console.log('路由验证');
        // 如果本地有 token，进行验证，否则，转到 index 界面
        if (userToken) {
            // 发送本地数据，返回用户信息
            store.dispatch('userCheck').then(res => {
                if (res) {
                    // 更新 token 值
                    userToken = store.state.user.token;
                    const user = JSON.parse(Base64.decode(userToken.split('.')[1]));
                    if (to.params.userName === user.userName) {
                        store.commit('setUserName', {name: user.userName});
                        store.commit('setUserId', {userId: user.userId});
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
            // to.params.userName = '123456';
            // next();
            next('/');
        }
    }
});

export default router;
