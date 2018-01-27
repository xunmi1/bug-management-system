<template>
    <div class="container">
        <form class="form">
            <input v-model="LoginInput.input1.value" v-bind="LoginInput.input1"/>
            <input v-model="LoginInput.input2.value" v-bind="LoginInput.input2"/>
            <input v-model="LoginInput.input3.value" v-bind="LoginInput.input3" v-on:click="loginTest"/>
        </form>
    </div>
</template>

<script>
    import qs from 'qs';

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
            type: 'button',
            value: '登录',
            name: 'login'
        }
    };
    export default {
        name: 'TheLoginInput',
        data() {
            return {LoginInput};
        },
        methods: {
            loginTest: function () {
                this.axios.post('/api/login', qs.stringify({
                    username: LoginInput.input1.value,
                    password: LoginInput.input2.value
                }))
                //使用箭头函数，使 this 指向 vue 实例
                    .then((response) => {
                        console.log(response.data);
                        if (response.status === 200) {
                            this.$router.push('main');
                        }
                    })
                    .catch(function (error) {
                        console.log(error.data);
                    });
            }
        }
    }
</script>

<style scoped src="../assets/stylesheets/theinput.css"></style>
