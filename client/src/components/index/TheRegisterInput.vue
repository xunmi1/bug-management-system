<template>
    <div class="container">
        <form class="form">
            <input v-model="userName" type="text" placeholder="填写用户名" name="username"/>
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
                this.$Loading.start();
                this.$store.dispatch('nameCheck', {
                    name: this.userName
                }).then((res) => {
                    if (res.status) {
                        this.$store.dispatch('registerUser', {
                            name: this.userName,
                            pwd: this.userPwd
                        }).then((res) => {
                            this.toMain(res);
                        });
                    } else {
                        this.$Notice.warning({title: '该用户名已存在', duration: 4.5});
                        this.$Loading.error();
                    }
                });
            },
            toMain: function (res) {
                switch (res.status) {
                    case 0:
                        this.$Notice.warning({
                            title: '注册失败！',
                            desc: '请检查输入内容，确保符合要求',
                            duration: 4.5
                        });
                        this.$Loading.error();
                        break;
                    case 1:
                        this.$cookie.set('userToken', res.token, {expires: '7D'});
                        this.$store.commit('setUserName', {name: res.data.userName});
                        this.$store.commit('setUserPwd', {name: res.data.userPwd});
                        this.$router.push({
                            name: 'user',
                            params: {userName: res.data.userName}
                        });
                        this.$Loading.finish();
                        break;
                }
            },
        }
    }
</script>

<style scoped src="../../assets/stylesheets/theinput.css"></style>
