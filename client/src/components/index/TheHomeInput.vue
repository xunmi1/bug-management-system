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
    import {mapState} from 'vuex';
    import {Base64} from 'js-base64';

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
                if (this.token) {
                    const user = JSON.parse(Base64.decode(this.token.split('.')[1]));
                    this.$router.push({
                        name: 'myProject',
                        params: {userName: user.userName}
                    });
                } else {
                    this.$Notice.warning({
                        title: '<p style="font-size: 15px">请重新登录！</p>', duration: 3
                    });
                    this.toLogin();
                }
            },
            toLogin: function () {
                this.$router.push({name: 'login'});
            },
            toRegister: function () {
                this.$router.push({name: 'register'});
            }
        },
        computed: {
            ...mapState({
                token: state => state.user.token
            })
        }
    }
</script>

<style scoped src="../../assets/stylesheets/theinput.css"></style>
