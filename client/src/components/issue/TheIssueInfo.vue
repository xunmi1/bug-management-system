<template>
    <Form ref="issueInfo" :model="issueInfo"
          :label-width="74" :rules="ruleInfo">
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
                    <Select v-model="issueInfo.project" transfer>
                        <Option value="project1">未知</Option>
                    </Select>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="模块">
                    <Select v-model="issueInfo.module" transfer>
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
                <FormItem label="版本号" prop="version">
                    <AutoComplete v-model="issueInfo.version"
                                  transfer
                                  :data="versionData"
                                  @on-search="versionSearch"
                                  placeholder="问题所在版本">
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
            const validateVersion = (rule, value, callback) => {
                if (value) {
                    const list = this.versionList.map(version => version.name);
                    if (!list.includes(value)) {
                        callback(new Error('该版本号不存在！'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                issueInfo: {
                    id: '',
                    title: '',
                    select: 'bug',
                    severity: 2,
                    version: '',
                    project: '',
                    module: '',
                    text: ''
                },
                ruleInfo: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {type: 'string', max: 30, message: '长度不超过30位', trigger: 'blur'},
                    ],
                    version: [
                        {required: true, message: '请确定版本', trigger: 'blur'},
                        {validator: validateVersion, trigger: 'blur'}
                    ],
                    text: [
                        {required: true, message: '请输入详细内容', trigger: 'blur'},
                        {type: 'string', max: 1024, message: '长度不超过1024位', trigger: 'blur'},
                    ]
                },
                versionList: [],  // 当前项目全部版本数据
                versionData: [],  // 搜索框列表临时版本数据
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
                if (val) {
                    this.versionData = this.versionList.map(version => version.name)
                        .filter(version => {
                            if (version.search(val) >= 0) return true;
                        })
                        .slice(-5);
                } else {
                    this.versionData = [];
                }
            },
            submitIssue() {
                this.$refs['issueInfo'].validate((valid) => {
                    if (valid) {
                        this.$store.commit('setIssueInfo', this.issueInfo);
                        this.$emit('change-modal', false);
                    } else {
                        this.$Message.error('<span style="font-size: 14px">请检查提交内容！</span>');
                    }
                });
            },
            resetIssue() {
                this.$refs['issueInfo'].resetFields();
                this.$emit('close-issue');
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            })
        },
        created() {
            this.versionList = this.projectList[this.defaultIndex].versionList;
        }
    }
</script>

<style scoped>

</style>
