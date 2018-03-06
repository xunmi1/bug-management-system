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
                switch (this.status) {
                    case 0:
                        this.$Notice.warning({title: '该用户名不存在！', duration: 1.5});
                        break;
                    case 1:
                        this.$Notice.warning({title: '密码错误！', duration: 1.5});
                        break;
                    case 2:
                        this.$Notice.warning({title: '该用户已在其他地方登录！', duration: 1.5});
                        break;
                    case 3:
                        this.$router.push({
                            name: 'userProject',
                            params: {userName: this.$store.state.user.userInfo.name}
                        });
                        break;
                }
                console.log('开始结束');
            },
            loginSubmit: function () {
                this.$store.dispatch('loginCheck', {
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
                status: state => state.user.userInfo.status
            })

        }
    }
</script>

<style scoped src="../../assets/stylesheets/theinput.css"></style>
