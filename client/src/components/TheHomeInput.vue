<template>
    <div class="container">
        <form class="form">
            <input v-model="HomeInput.input1.value" v-bind="HomeInput.input1" v-on:click="toMain"/>
            <input v-model="HomeInput.input2.value" v-bind="HomeInput.input2" v-on:click="toLogin"/>
            <input v-model="HomeInput.input3.value" v-bind="HomeInput.input3" v-on:click="toRegister"/>
        </form>
    </div>
</template>

<script>
    const HomeInput = {
        input1: {
            type: 'button',
            value: '进入',
        },
        input2: {
            type: 'button',
            value: '登录',
        },
        input3: {
            type: 'button',
            value: '注册',
        }
    };
    export default {
        name: 'TheHomeInput',
        data() {
            return {HomeInput};
        },
        methods: {
            /**
             * 不能使用箭头函数来定义 method 函数
             * 箭头函数绑定了父级作用域的上下文，this 将不会按照期望指向 Vue 实例，this.*** 会是 undefined
             * 见 https://cn.vuejs.org/v2/api/#methods
             */
            toMain: function () {
                this.$router.push('/main/project');
            },
            toLogin: function () {
                this.$router.push('/login');
            },
            toRegister: function () {
                this.$router.push('/register');
            }
        }
    }
</script>

<style scoped src="../assets/stylesheets/theinput.css"></style>
