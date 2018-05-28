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
                switch (this.status) {
                    case 0:
                        this.$Loading.error();
                        this.$Notice.warning({title: '该用户名不存在！', duration: 1.5});
                        break;
                    case 1:
                        this.$Loading.error();
                        this.$Notice.warning({title: '密码错误！', duration: 1.5});
                        break;
                    case 2:
                        this.$Loading.error();
                        this.$Notice.warning({title: '该用户已在其他地方登录！', duration: 1.5});
                        break;
                    case 3:
                        // expires 不能使用 d 表示天数，只能用 D
                        this.$cookie.set('userToken', this.token, {expires: '7D'});
                        this.$router.push({
                            name: 'myProject',
                            params: {userName: this.$store.state.user.userInfo.name}
                        });
                        this.$Loading.finish();
                        break;
                }
            },
            loginSubmit: function () {
                this.$Loading.start();
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
                status: state => state.user.userInfo.status,
                token: state => state.user.token
            })
        }
    }
</script>

<style scoped src="../../assets/stylesheets/theinput.css"></style>
