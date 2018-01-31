<template>
    <div class="container">
        <form class="form">
            <input v-model="userName" type="text" placeholder="用户名" name="username"/>
            <input v-model="userPwd" type="password" placeholder="密码" name="possword"/>
            <input type="button" value="登录" @click="loginSubmit"/>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'TheLoginInput',
        data() {
            return {
                userName: '',
                userPwd: ''
            };
        },
        methods: {
            toMain: function () {
                console.log('开始验证');
                if (this.$store.state.user.stating) {
                    this.$router.push('/main/project');
                }
            },
            loginSubmit: function () {
                this.$store.commit('upUserName', {
                    name: this.userName
                });
                this.$store.commit('upUserPwd', {
                    pwd: this.userPwd
                });
                this.$store.dispatch('loginCheck').then(() => {
                    setTimeout(this.toMain, 260);
                });
            }
        }
    }
</script>

<style scoped src="../assets/stylesheets/theinput.css"></style>
