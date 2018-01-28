<template>
    <div class="container">
        <form class="form">
            <input v-model="RegisterInput.input1.value" v-bind="RegisterInput.input1"/>
            <input v-model="RegisterInput.input2.value" v-bind="RegisterInput.input2"/>
            <input v-model="RegisterInput.input3.value" v-bind="RegisterInput.input3" v-on:click="registerTest"/>
        </form>
    </div>
</template>

<script>
    let RegisterInput = {
        input1: {
            type: 'text',
            placeholder: '手机号或邮箱',
            name: 'username'
        },
        input2: {
            type: 'password',
            placeholder: '密码',
            name: 'pwd'
        },
        input3: {
            type: 'button',
            value: '注册',
            name: 'register'
        }
    };
    export default {
        name: 'TheRegisterInput',
        data() {
            return {RegisterInput};
        },
        methods: {
            registerTest: function () {
                this.$router.push('main');
            }
        }
    }
</script>

<style scoped src="../assets/stylesheets/theinput.css"></style>
