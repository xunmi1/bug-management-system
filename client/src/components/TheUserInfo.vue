<template>
    <Collapse value="1" style="font-size: 14px">
        <Panel name="1">
            基本信息
            <div slot="content">
                <div class="content-info">
                    <div class="content-info content-flex-direction content-info-left">
                        <div class="content-info-box">
                            <p>用户名：</p>
                            <Input v-model="userInfo.name" clearable
                                   class="info-input"></Input>
                        </div>
                        <div class="content-info-box">
                            <p>邮箱：</p>
                            <Input v-model="userInfo.email" clearable type="email"
                                   class="info-input"></Input>
                        </div>
                        <div class="content-info-box">
                            <p>个性简介：</p>
                            <Input v-model="userInfo.text"
                                   :autosize="{minRows: 3, maxRows: 5}" type="textarea"
                                   style="width: 360px" class="info-input"></Input>
                        </div>
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
                                <Icon type="camera" size="24"
                                      style="line-height: 40px; vertical-align: middle"></Icon>
                                <label>上传头像</label>
                            </div>
                        </Upload>
                    </div>
                </div>
            </div>
        </Panel>
        <Panel name="2">
            安全设置
            <div slot="content">

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
            return {
                userInfo: {
                    name: '',
                    pwd: '',
                    email: '',
                    text: ''
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
                this.userInfo.name = this.user.name;
                this.userInfo.pwd = this.user.pwd;
                this.userInfo.email = this.user.email;
                this.userInfo.text = this.user.text;
                this.defaultAvatar[0].name = this.user.avatarId;
            },
            handleSuccess(evnet, file) {
                this.defaultAvatar[0].name = file.response.filename;
                this.$store.commit('setUserAvatarId', {
                    avatarId: file.response.filename
                });
                this.$Notice.success({
                    title: '上传成功',
                    desc: file.name + ' 上传成功'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出图片大小限制',
                    desc: file.name + ' 太大，不能超过 1M'
                });
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '图片格式不正确',
                    desc: file.name + ' 格式不正确，请选择合适的图片'
                });
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            })
        },
        created() {
            this.init();
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
        height: 280px;
    }

    .content-info-right {
        width: 200px;
        height: 280px;
        margin: 0 auto;
    }

    .content-info-box {
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .content-info-box p {
        font-size: 15px;
    }

    .info-input {
        width: 200px;
    }
</style>
