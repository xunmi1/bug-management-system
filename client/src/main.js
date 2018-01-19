/**
 * webpack 打包入口，寻找其他依赖
 * 声明与其他组件的依赖关系
 */
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
