<template>
    <Collapse value="1" style="font-size: 14px">
        <Panel name="1">
            基本信息
            <div slot="content">
                <div class="avatar">
                    <i class="avatar-i fa fa-user-o"></i>
                    <div class="img-position">
                        <img v-bind:src="defaultAvatar.file + defaultAvatar.name"
                             width="200" height="200" alt=""/>
                    </div>
                </div>
                <Upload
                    :show-upload-list="false"
                    :default-file-list="defaultAvatar"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="1024"
                    :before-upload="handleUp"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    action=""
                    style="width: 200px">
                    <div>
                        <Icon type="camera" size="24"
                              style="line-height: 40px; vertical-align: middle"></Icon>
                        <span>上传头像</span>
                    </div>
                </Upload>
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
    export default {
        name: "theUserInfo",
        data () {
            return {
                defaultAvatar:[
                    {
                        name: '',
                        file: '../assets/images/'
                    }
                ]
            }
        },
        methods: {
            // handleUp(file) {
            //     this.defaultAvatar[0].name = file.name;
            //     console.log(file);
            // },
            handleSuccess (evnet, file) {
                this.defaultAvatar[0].name = file.name;
                console.log(file);
                this.$Notice.success({
                    title: '上传成功',
                    desc: file.name + ' 上传成功'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出图片大小限制',
                    desc: file.name + ' 太大，不能超过 1M'
                });
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '图片格式不正确',
                    desc: file.name + ' 格式不正确，请选择合适的图片'
                });
            }
        }
    }
</script>

<style scoped>
    .avatar {
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        margin : 10px 0;
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
</style>
