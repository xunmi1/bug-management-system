/**
 * webpack 打包入口，寻找其他依赖
 * 声明与其他组件的依赖关系
 */
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';

/* 阻止 vue 在启动时生成生产提示 */
Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    data: {
        // 使用空的 Vue 实例作为事件总线，解决非父子关系的组件间通信
        Bus: new Vue()
    }
});
