<template>
    <div class="container">
        <form class="form">
            <input v-model="LoginInput.input1.value" v-bind="LoginInput.input1"/>
            <input v-model="LoginInput.input2.value" v-bind="LoginInput.input2"/>
            <input v-model="LoginInput.input3.value" v-bind="LoginInput.input3"/>
        </form>
    </div>
</template>

<script>
    let LoginInput = {
        input1: {
            type: 'text',
            placeholder: '用户名',
            name: 'username'
        },
        input2: {
            type: 'password',
            placeholder: '密码',
            name: 'pwd'
        },
        input3: {
            type: 'submit',
            value: '登录',
            name: 'login'
        }
    };
    export default {
        name: 'TheLoginInput',
        data() {
            return { LoginInput };
        }
    }
</script>

<style scoped src="../assets/stylesheets/theinput.css"></style>
