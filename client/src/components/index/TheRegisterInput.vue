<template>
    <div class="container">
        <form class="form">
            <input v-model="userName" type="text" placeholder="邮箱地址" name="username"/>
            <input v-model="userPwd" type="password" placeholder="密码" name="possword"/>
            <input type="button" value="注册" @click="registerSubmit"/>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'TheRegisterInput',
        data() {
            return {
                userName: '',
                userPwd: ''
            };
        },
        methods: {
            registerSubmit: function () {
                // 如果后台验证通过
                if (this.userName) {
                    this.$store.commit('setUserName', {name: this.userName});
                    this.$store.commit('setUserPwd', {name: this.userPwd});
                    this.$store.commit('setUserEmail', {email: this.userName});
                    this.$router.push({
                        name: 'myProject',
                        params: {userName: this.$store.state.user.userInfo.name}
                    });
                }
            }
        }
    }
</script>

<style scoped src="../../assets/stylesheets/theinput.css"></style>
