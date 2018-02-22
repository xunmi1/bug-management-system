<template>
    <Card>
        <Form ref="projectInfo" :model="projectInfo" :rules="ruleInfo">
            <Row>
                <iCol span="10">
                    <FormItem prop="title" class="content-info-box">
                        <p>项目标题：</p>
                        <Input v-model="projectInfo.title" clearable class="info-input"></Input>
                    </FormItem>
                    <FormItem prop="desc" class="content-info-box">
                        <p>简要描述：</p>
                        <Input v-model="projectInfo.desc"
                               :autosize="{minRows: 3, maxRows: 6}" type="textarea"
                               style="width: 360px" class="info-input"></Input>
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
                <iCol span="4">
                    <Avatar shape="square">Project</Avatar>
                    <Upload
                        :show-upload-list="false"
                        :default-file-list="projectInfo.img"
                        :on-success="handleSuccess"
                        :format="['jpg', 'jpeg', 'png', 'gif', 'ico']"
                        :max-size="1024"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        type="drag"
                        action="http://localhost:8000/poject/img">
                        <!--style="width: 160px">-->
                        <Button type="ghost" icon="ios-cloud-upload-outline" long>上传图标</Button>
                    </Upload>
                </iCol>
            </Row>
        </Form>
    </Card>
</template>

<script>
    export default {
        name: "ProjectInfo",
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
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('成功!');
                    } else {
                        this.$Message.error('失败！');
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
        }
    }
</script>

<style scoped>
    .content-info-box {
        margin: 0 6px 22px 6px;
    }

    .content-info-box p {
        font-size: 15px;
    }

    .info-input {
        width: 200px;
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
</style>
