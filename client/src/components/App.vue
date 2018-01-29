<!-- 顶层组件，在 main.js 注册
  -- 仅仅定义组件内容，需要在使用时注册
  -- template 定义模板
  -- export default 导出组件对象，指定模块的默认输出 (ES6) -->
<template>
    <div id="app">
        <!--<img src="./assets/images/logo.png">-->
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    };
</script>

<style>
    #app {
        color: #2c3e50;
    }
</style>
<style src="../assets/stylesheets/basestyle.css"></style>
