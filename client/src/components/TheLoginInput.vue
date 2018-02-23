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
    import {mapState} from 'vuex';

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
                if (this.stating) {
                    console.log('开始结束');
                    this.$router.push({
                        name: 'userProject',
                        params: {userName: this.$store.state.user.userInfo.name}
                    });
                }
            },
            loginSubmit: function () {
                this.$store.dispatch('loginCheck',{
                    name: this.userName,
                    pwd: this.userPwd
                }).then(() => {
                    this.toMain();
                    //setTimeout(this.toMain, 260);
                });
            }
        },
        computed: {
            ...mapState({
                stating: state => state.user.userInfo.localStating
            })

        }
    }
</script>

<style scoped src="../assets/stylesheets/theinput.css"></style>
