<template>
    <Form ref="issueInfo" :model="issueInfo" :label-width="74" :rules="ruleInfo">
        <Row>
            <iCol span="18">
                <FormItem label="标题" prop="title">
                    <Input v-model="issueInfo.title" placeholder="问题简述......"></Input>
                </FormItem>
            </iCol>
            <iCol span="6">
                <FormItem label="类型">
                    <Select v-model="issueInfo.select">
                        <Option value="bug">缺陷</Option>
                        <Option value="task">任务</Option>
                        <Option value="require">需求</Option>
                        <Option value="optimize">优化</Option>
                    </Select>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="12">
                <FormItem label="所属项目">
                    <Select v-model="issueInfo.project">
                        <Option value="project1">未知</Option>
                    </Select>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="模块">
                    <Select v-model="issueInfo.module">
                        <Option value="module1">未知</Option>
                    </Select>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="14">
                <FormItem label="严重程度">
                    <Slider v-model="issueInfo.severity" :max="4" :tip-format="tipFormat" show-stops></Slider>
                </FormItem>
            </iCol>
            <iCol span="10">
                <FormItem label="版本号">
                    <AutoComplete v-model="issueInfo.version" :data="versionList"
                                  @on-search="versionSearch" placeholder="问题所在版本">
                    </AutoComplete>
                </FormItem>
            </iCol>
        </Row>
        <FormItem label="描述" prop="text">
            <Input v-model="issueInfo.text" type="textarea"
                   :autosize="{minRows: 4, maxRows: 12}"></Input>
        </FormItem>
        <FormItem label="附件">
            <Row>
                <iCol span="6">
                    <Upload multiple action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">图片上传</Button>
                    </Upload>
                </iCol>
                <iCol span="6">
                    <Upload multiple action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">文本上传</Button>
                    </Upload>
                </iCol>
                <iCol span="6">
                    <Upload multiple action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">其他附件</Button>
                    </Upload>
                </iCol>
            </Row>
        </FormItem>
    </Form>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "theIssueInfo",
        data() {
            return {
                ruleInfo: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {type: 'string', max: 30, message: '长度不超过30位', trigger: 'blur'},
                    ],
                    text: [
                        {required: true, message: '请输入详细内容', trigger: 'blur'},
                        {type: 'string', max: 3000, message: '长度不超过3000位', trigger: 'blur'},
                    ]
                },
            }
        },
        methods: {
            tipFormat(val) {
                switch (val) {
                    case 0:
                        return '极低';
                    case 1:
                        return '低';
                    case 2:
                        return '中';
                    case 3:
                        return '高';
                    case 4:
                        return '极高';
                }
            },
            versionSearch(val) {
                this.versionList = !val ? [] : [
                    value,
                    val + '.1'
                ];
            },
            submit() {
                this.$refs['issueInfo'].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        this.$store.commit('setIssueInfo', this.issueInfo);
                        this.$Message.success('提交成功！');
                    } else {
                        this.$Message.error('提交失败！');
                    }
                });
            }
        },
        computed: {
            ...mapState({
                issueInfo: state => state.issue.issueInfo,
                versionList: state => state.project.projectList[0].versionList
            })
        }
    }
</script>

<style scoped>

</style>
