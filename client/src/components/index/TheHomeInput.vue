<template>
    <div class="container">
        <form class="form">
            <input type="button" value="进入" v-on:click="toMain"/>
            <input type="button" value="登录" v-on:click="toLogin"/>
            <input type="button" value="注册" v-on:click="toRegister"/>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'TheHomeInput',
        data() {
            return {};
        },
        methods: {
            /**
             * 不能使用箭头函数来定义 method 函数
             * 箭头函数绑定了父级作用域的上下文，this 将不会按照期望指向 Vue 实例，this.*** 会是 undefined
             * 见 https://cn.vuejs.org/v2/api/#methods
             */
            toMain: function () {
                this.$router.push({
                    name: 'userProject',
                    params: {userName: this.$store.state.user.userInfo.name}
                });
            },
            toLogin: function () {
                this.$router.push({name: 'login'});
            },
            toRegister: function () {
                this.$router.push({name: 'register'});
            }
        }
    }
</script>

<style scoped src="../../assets/stylesheets/theinput.css"></style>
