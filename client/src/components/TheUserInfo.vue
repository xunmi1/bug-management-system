<template>
    <Collapse value="1" style="font-size: 14px">
        <Panel name="1">
            基本信息
            <div slot="content">
                <div class="content-info">
                    <div class="content-info content-flex-direction content-info-left">
                        <Form ref="userInfo" :model="userInfo" :rules="ruleInfo">
                            <FormItem prop="name" class="content-info-box">
                                <p>用户名：</p>
                                <Input v-model="userInfo.name" clearable class="info-input"></Input>
                            </FormItem>
                            <FormItem prop="email" class="content-info-box">
                                <p>邮箱：</p>
                                <Input v-model="userInfo.email" clearable class="info-input"></Input>
                            </FormItem>
                            <FormItem prop="desc" class="content-info-box">
                                <p>个性简介：</p>
                                <Input v-model="userInfo.desc"
                                       :autosize="{minRows: 2, maxRows: 5}" type="textarea"
                                       style="width: 360px" class="info-input"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="content-info content-flex-direction content-info-right">
                        <div class="avatar">
                            <i class="avatar-i fa fa-user-o"></i>
                            <div class="img-position">
                                <img :src="defaultAvatar[0].file + defaultAvatar[0].name"
                                     width="200" height="200" alt=""/>
                            </div>
                        </div>
                        <Upload
                            :show-upload-list="false"
                            :default-file-list="defaultAvatar"
                            :on-success="handleSuccess"
                            :format="['jpg', 'jpeg', 'png', 'gif', 'ico']"
                            :max-size="1024"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            type="drag"
                            action="http://localhost:8000/user/avatar"
                            style="width: 200px">
                            <div style="background-color: #e6e6e6">
                                <Icon type="camera" size="22"
                                      style="line-height: 40px; vertical-align: middle"></Icon>
                                <label>上传头像</label>
                            </div>
                        </Upload>
                    </div>
                    <div class="content-info content-button">
                        <ButtonGroup size="large">
                            <Button @click="handleReset('userInfo')">取消</Button>
                            <Button type="primary" @click="commitInfo">确定</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </Panel>
        <Panel name="2">
            安全设置
            <div slot="content">
                <div class="content-info">
                    <div class="content-info content-flex-direction content-info-left">
                        <Form ref="userSafe" :model="userSafe" :rules="ruleSafe">
                            <FormItem prop="pwd" class="content-info-box">
                                <p>原密码：</p>
                                <Input v-model="userSafe.pwd" clearable type="password"
                                       class="info-input-pwd"></Input>
                            </FormItem>
                            <FormItem prop="newPwd" class="content-info-box">
                                <p>新密码：</p>
                                <Input v-model="userSafe.newPwd" clearable type="password"
                                       class="info-input-pwd"></Input>
                            </FormItem>
                            <FormItem prop="pwdCheck" class="content-info-box">
                                <p>确认新密码：</p>
                                <Input v-model="userSafe.pwdCheck" clearable type="password"
                                       class="info-input-pwd"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="content-info content-button">
                        <ButtonGroup size="large">
                            <Button @click="handleReset('userSafe')">取消</Button>
                            <Button type="primary" @click="commitSafe">确定</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </Panel>
        <Panel name="3">
            消息订阅
            <div slot="content">

            </div>
        </Panel>
    </Collapse>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "theUserInfo",
        data() {
            const validatePass = (rule, value, callback) => {
                if (value) {
                    if (this.userSafe.pwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.userSafe.validateField('pwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.userSafe.newPwd) {
                    callback(new Error('两次密码不一致！'));
                } else {
                    callback();
                }
            };

            return {
                oldName: '',
                userInfo: {
                    name: '',
                    email: '',
                    desc: '',
                    userId: '',
                    avatarId: '',
                },
                userSafe: {
                    pwd: '',
                    newPwd: '',
                    pwdCheck: '',
                },
                ruleInfo: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {type: 'string', min: 6, message: '长度不少于6位', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '邮箱地址不正确', trigger: 'blur'}
                    ]
                },
                ruleSafe: {
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    newPwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不少于6位', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    pwdCheck: [
                        {validator: validatePassCheck, trigger: 'blur'}
                    ]
                },
                defaultAvatar: [
                    {
                        name: '',
                        file: 'http://localhost:8000/public/images/'
                    }
                ]
            }
        },
        methods: {
            init() {
                this.oldName = this.userInfo.name = this.user.name;
                this.userInfo.userId = this.user.userId;
                this.userInfo.email = this.user.email;
                this.userInfo.desc = this.user.desc;
                this.defaultAvatar[0].name = this.userInfo.avatarId = this.user.avatarId;
            },

            commitInfo() {
                this.$refs['userInfo'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('nameCheck', this.userInfo).then((response) => {
                            if (response.status || this.userInfo.name === this.oldName) {
                                this.$store.dispatch('setInfo', this.userInfo).then(res => {
                                    if (res.status) {
                                        this.$Notice.success({
                                            title: '修改成功！',
                                            desc: '请重新登录系统'
                                        });
                                        setTimeout(() => {
                                            this.$router.push({name: 'login'});
                                        }, 1500);
                                    } else {
                                        this.$Message.error('修改失败！');
                                    }
                                });
                            } else {
                                this.$Loading.error();
                                this.$Message.error('用户名不可用！');
                            }
                        });
                    } else {
                        this.$Message.error('修改失败！');
                    }
                });
            },
            commitSafe() {
                this.$refs['userSafe'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('setSafe', {
                            userId: this.userInfo.userId,
                            oldPwd: this.userSafe.pwd,
                            newPwd: this.userSafe.newPwd
                        }).then(res => {
                            if (res.status) {
                                this.$Message.success('修改成功！');
                            } else {
                                this.$Notice.error({
                                    title: '修改失败！',
                                    desc: '请检查原密码是否正确'
                                });
                            }
                        });
                    } else {
                        this.$Message.error('修改失败！');
                    }
                });
            },

            handleReset(name) {
                this.$refs[name].resetFields();
            },
            handleSuccess(evnet, file) {
                this.userInfo.avatarId = this.defaultAvatar[0].name = file.response.filename;
                this.$store.commit('setUserAvatarId', {
                    avatarId: file.response.filename
                });
                this.$Notice.success({
                    title: '上传成功',
                    desc: file.name + ' 上传成功，请点击确认'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出图片大小限制',
                    desc: file.name + ' 文件太大，不能超过 1M'
                });
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '图片格式不正确',
                    desc: file.name + ' 的格式不正确，请选择合适的图片'
                });
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.userInfo
            })
        },
        mounted() {
            this.$store.dispatch('getInfo').then(() => {
                this.init();
            });
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .avatar {
        width: 200px;
        height: 200px;
        margin-bottom: 16px;
        border: 1px dashed #aaa;
        background-color: #f7f7f7;
    }

    .avatar-i {
        font-size: 7em;
        margin: 51px 58px;
    }

    .img-position {
        position: relative;
        width: 200px;
        height: 200px;
        bottom: 200px;
        z-index: 10;
    }

    .content-info {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .content-flex-direction {
        flex-direction: column;
    }

    .content-info-left {
        width: 400px;
    }

    .content-info-right {
        width: 200px;
        margin: 0 auto;
    }

    .content-info-box {
        margin: 0 6px 22px 6px;
    }

    .content-info-box p {
        font-size: 15px;
    }

    .info-input {
        width: 200px;
    }

    .info-input-pwd {
        width: 360px
    }

    .content-button {
        width: 100%;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        text-align: center;
        font-size: 0; /* 消除 inline-block 间隙*/
    }

    .content-button button {
        width: 100px;
    }
</style>
