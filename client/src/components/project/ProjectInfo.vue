<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <Form ref="projectInfo" :model="projectInfo" :rules="ruleInfo">
            <Row :gutter="24">
                <iCol span="14">
                    <FormItem prop="title" class="content-info-box">
                        <p>项目标题：</p>
                        <Input v-model="projectInfo.title" style="width: 100%; max-width:300px" clearable></Input>
                    </FormItem>
                    <FormItem prop="desc" class="content-info-box">
                        <p>简要描述：</p>
                        <Input v-model="projectInfo.desc"
                               :autosize="{minRows: 3, maxRows: 6}" type="textarea"
                               style="width: 100%; max-width:460px"></Input>
                    </FormItem>
                    <FormItem class="content-info-box">
                        <div class="content-button">
                            <ButtonGroup size="large">
                                <Button type="primary" @click="handleSubmit('projectInfo')">确定</Button>
                                <Button @click="handleReset('projectInfo')">取消</Button>
                            </ButtonGroup>
                        </div>
                    </FormItem>
                </iCol>
                <iCol span="10">
                    <div class="img-size">
                        <img :src="projectInfo.img[0].file+projectInfo.img[0].name"
                             class="img-size" width="128" height="128" alt="project"/>
                    </div>
                    <Upload
                        :show-upload-list="false"
                        :default-file-list="projectInfo.img"
                        :on-success="handleSuccess"
                        :format="['jpg', 'jpeg', 'png', 'gif', 'ico']"
                        :max-size="1024"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        action="http://localhost:8000/project/img">
                        <Button type="ghost" icon="ios-cloud-upload-outline" class="upload-button">
                            上传图标
                        </Button>
                    </Upload>
                </iCol>
            </Row>
        </Form>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "ProjectInfo",
        props: {
            isBordered: {
                type: Boolean,
                default: true
            },
            data: {
                type: Object
            }
        },
        data() {
            return {
                projectInfo: {
                    title: '',
                    desc: '',
                    img: [{
                        name: '',
                        file: 'http://localhost:8000/public/images/'
                    }]
                },
                ruleInfo: {
                    title: [
                        {required: true, message: '请输入项目标题', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入项目简要描述', trigger: 'blur'},
                        {type: 'string', min: 8, message: '不少于8位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            init() {
                if (!this.data) {
                    this.projectInfo.title = this.stateInfo.title;
                    this.projectInfo.desc = this.stateInfo.desc;
                    this.projectInfo.img[0].name = this.stateInfo.imgName;
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功!');
                        this.$emit('on-ok');
                    } else {
                        this.$Message.error('修改失败！');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            handleSuccess(evnet, file) {
                this.projectInfo.img[0].name = file.response.filename;
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
                stateInfo: state => state.project.projectList[0].info
            })
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    .padding {
        padding: 30px 24px;
        background-color: #fff;
        border-radius: 4px;
    }

    .bordered {
        border: 1px solid #dddee1;
        position: relative;
        transition: all .2s ease-in-out;
    }

    .bordered:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        border-color: #eee;
    }

    .content-info-box {
        margin: 0 6px 22px 6px;
    }

    .content-info-box p {
        font-size: 15px;
    }

    .content-button {
        width: 100%;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        text-align: center;
    }

    .content-button button {
        width: 100px;
    }

    .img-size {
        background-color: #f9f9f9;
        width: 128px;
        height: 128px;
        font-size: 22px;
        text-align: center;
    }

    .upload-button {
        font-size: 14px;
        padding: 6px 25px;
    }
</style>
