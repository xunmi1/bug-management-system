/**
 * webpack 打包入口，寻找其他依赖
 * 声明与其他组件的依赖关系
 */
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
/* 阻止 vue 在启动时生成生产提示 */
Vue.config.productionTip = false;

Vue.use(iView);

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
