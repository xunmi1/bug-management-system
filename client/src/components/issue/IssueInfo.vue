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
                    <Select v-model="issueInfo.project" transfer
                            :placeholder="projectInfo.title +' [默认]'">
                        <Option :value="projectInfo.id">{{projectInfo.title}}</Option>
                    </Select>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="模块" prop="module">
                    <AutoComplete v-model="issueInfo.module"
                                  transfer
                                  :data="moduleData"
                                  @on-search="handelSearch($event, 'moduleList', 'moduleData')"
                                  placeholder="问题所在模块"></AutoComplete>
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
                                  @on-search="handelSearch($event, 'versionList', 'versionData')"
                                  placeholder="问题所在版本"></AutoComplete>
                </FormItem>
            </iCol>
        </Row>
        <FormItem label="描述" prop="text">
            <Input v-model="issueInfo.text"
                   type="textarea"
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
                        <Button type="ghost" icon="ios-cloud-upload-outline">
                            其他附件
                        </Button>
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
        props: {
            'issue-info': {
                type: Object
            }
        },
        data() {
            const validateModule = (rule, value, callback) => {
                if (value) {
                    const list = this.moduleList.map(item => item.title);
                    if (!list.includes(value)) {
                        callback(new Error('该模块不存在！'));
                    } else {
                        callback();
                    }
                }
            };
            const validateVersion = (rule, value, callback) => {
                if (value) {
                    const list = this.versionList.map(item => item.title);
                    if (!list.includes(value)) {
                        callback(new Error('该版本号不存在！'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                ruleInfo: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {type: 'string', max: 30, min: 6, message: '长度范围6 ~ 30位', trigger: 'blur'},
                    ],
                    module: [
                        {required: true, message: '请确定模块', trigger: 'blur'},
                        {validator: validateModule, trigger: 'blur'}
                    ],
                    version: [
                        {required: true, message: '请确定版本', trigger: 'blur'},
                        {validator: validateVersion, trigger: 'blur'}
                    ],
                    text: [
                        {required: true, message: '请输入详细内容', trigger: 'blur'},
                        {type: 'string', max: 1024, message: '长度不超过2048位', trigger: 'blur'},
                    ]
                },
                moduleList: [],
                moduleData: [],
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

            /**
             * 自助完成输入框搜索
             * @param val 当前填写值
             * @param list 完整来源数据
             * @param data 当前下拉框数据
             */
            handelSearch(val, list, data) {
                if (val) {
                    this[data] = this[list].map(item => item.title)
                        .filter(item => {
                            if (item.search(val) >= 0) return true;
                        })
                        .slice(-5);
                } else {
                    this[data] = [];
                }
            },
            submitIssue() {
                this.$refs['issueInfo'].validate((valid) => {
                    if (valid) {
                        // 设置默认项目 id
                        this.issueInfo.project = this.projectInfo.id;
                        this.$emit('change-modal', false);
                    } else {
                        this.$Message.error('<span style="font-size: 14px">请检查提交内容！</span>');
                    }
                });
            },
            resetIssue() {
                this.$refs['issueInfo'].resetFields();
                this.$emit('close-issue');
            },
            // 深度优先遍历项目模块, 只保存所有叶节点
            inOrderRoot(node) {
                if (node) {
                    // 保存所有节点
                    // this.moduleList.push({'title': node.title});
                    if (node.children && node.children.length > 0) {
                        for (let i = 0; i < node.children.length; i++) {
                            this.inOrderRoot(node.children[i]);
                        }
                    } else {
                        this.moduleList.push({'title': node.title});
                    }
                }
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            })
        },
        created() {
            this.projectInfo = this.projectList[this.defaultIndex].info;
            this.versionList = this.projectList[this.defaultIndex].versionList;
            this.inOrderRoot(this.projectList[this.defaultIndex].moduleList[0]);
        }
    }
</script>

<style scoped>

</style>
