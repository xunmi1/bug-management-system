<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <slot name="header">
            <div class="header">
                <Icon type="ios-paper fa-fw" style="color: #2d8cf0"></Icon>
                项目信息
            </div>
        </slot>
        <Form ref="projectInfo" :model="projectInfo" :rules="ruleInfo">
            <Row :gutter="24">
                <iCol span="14">
                    <FormItem prop="title" class="content-info-box">
                        <p>项目名称：</p>
                        <Input v-model="projectInfo.title" style="width: 100%; max-width:300px" clearable></Input>
                    </FormItem>
                    <FormItem prop="desc" class="content-info-box">
                        <p>简要描述：</p>
                        <Input v-model="projectInfo.desc"
                               :autosize="{minRows: 3, maxRows: 6}" type="textarea"
                               style="width: 100%; max-width:460px"></Input>
                    </FormItem>
                    <FormItem prop="share" class="content-info-box">
                        <span style="font-size: 14px">问题共享：</span>
                        <Switch v-model="projectInfo.share" size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </Switch>
                        <Alert v-if="projectInfo.share" show-icon closable>
                            开启后，本项目中的问题和解决方法脱敏后，会保存到知识库中，帮助其他人解决问题。
                        </Alert>
                        <Alert v-else type="warning" show-icon closable>
                            关闭后，将无法使用全局搜索功能。
                        </Alert>
                    </FormItem>
                    <FormItem class="content-info-box">
                        <div class="content-button">
                            <ButtonGroup size="large">
                                <Button @click="handleReset('projectInfo')">取消</Button>
                                <Button type="primary" @click="handleSubmit('projectInfo')">确定</Button>
                            </ButtonGroup>
                        </div>
                    </FormItem>
                </iCol>
                <iCol span="10">
                    <div class="img-size">
                        <img :src="'http://localhost:8000/public/images/'+projectInfo.imgName"
                             class="img-size" width="128" height="128" alt="project"/>
                    </div>
                    <Upload
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg', 'jpeg', 'png', 'gif', 'ico']"
                        :max-size="1024"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        action="http://localhost:8000/project/img">
                        <Button type="ghost"
                                icon="ios-cloud-upload-outline"
                                class="upload-button">上传图标
                        </Button>
                    </Upload>
                </iCol>
            </Row>
        </Form>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

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
                projectInfo: {},
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
                    if (this.defaultIndex >= 0) {
                        const stateInfo = this.projectList[this.defaultIndex].info;
                        // Object.assign() 只适合复制子级是值类型
                        this.projectInfo = Object.assign({}, stateInfo);
                    } else {
                        this.$router.push({name: 'myProject'});
                        this.$root.Bus.$emit('closeComponent', 'ProjectInfo');
                        this.$Notice.warning({
                            title: '没有项目可打开！',
                            desc: '请设置你的默认项目，或者创建新项目。'
                        });
                    }
                } else {
                    this.projectInfo = Object.assign({}, this.data);
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (!this.data) {
                        if (valid) {
                            this.$store.commit('setProjectInfo', {
                                title: this.projectInfo.title,
                                desc: this.projectInfo.desc,
                                imgName: this.projectInfo.imgName
                            });
                            this.$Message.success('修改成功！');
                        } else {
                            this.$Loading.error();
                            this.$Message.error('修改失败！');
                        }
                    } else {
                        if (valid) {
                            this.$emit('update:data', this.projectInfo);
                            this.$emit('on-ok');
                        } else {
                            this.$Loading.error();
                            this.$Message.error('请检查输入内容！');
                        }
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
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
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

    .header {
        position: relative;
        font-size: 15px;
        border-bottom: 1px solid #e9eaec;
        top: -14px;
        padding-bottom: 16px;
        line-height: 1;
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
