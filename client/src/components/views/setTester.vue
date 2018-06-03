<template>
    <Card>
        <div slot="title">
            <Tooltip content="单击相关列，进入设置">
                <Icon type="ios-analytics"></Icon>
                <span>待测试问题列表</span>
            </Tooltip>
        </div>
        <base-table :columns="columns"
                    :data="dataList"
                    :page-size="10"
                    @on-row-click="showModal"></base-table>
        <Modal v-model="modal"
               :mask-closable="false"
               :closable="false"
               :styles="{top: '50px',width: '680px'}">
            <div slot="header" class="header-font">
                <span>测试结果</span>
            </div>
            <div></div>
            <div class="modal-item">
                <span>是否通过测试：</span>
                <Switch v-model="isClose">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </Switch>
            </div>
            <div v-show="!isClose" class="modal-item">
                <p>未通过原因描述：</p>
                <base-editor @get-content="getContent" ref="editor"></base-editor>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="reset">取消</Button>
                <Tooltip content="切勿刷新页面">
                    <Button type="ghost" size="large" @click="tmpContent">暂存</Button>
                </Tooltip>
                <Button type="primary" size="large" @click="submit">确定</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
    import {mapState} from 'vuex';
    import BaseTable from '../base/BaseTable';
    import BaseEditor from '../base/BaseEditor';

    export default {
        name: "SetTester",
        components: {
            BaseTable,
            BaseEditor
        },
        data() {
            return {
                columns: [
                    {type: 'index', width: 60, title: '序号', align: 'center'},
                    {title: '标题', key: 'title'},
                    {title: '类型', key: 'select'},
                    {title: '模块', key: 'module'},
                    {title: '版本号', key: 'version', sortable: true},
                    {title: '优先级', key: 'priority', sortable: true},
                    {title: '解决', key: 'developer', sortable: true},
                    {title: '分配', key: 'dispense', sortable: true}
                ],
                modal: false,
                isClose: true,
                testDesc: '',
                people: '',
                issueIndex: [],  // 所有问题 id 列表，用于快速查找选中问题的索引
                clickRowIndex: ''     // 被选中的问题的索引
            }
        },
        methods: {
            reset() {
                this.modal = false;
                this.isClose = true;
                this.$refs.editor.clearContent();
            },
            tmpContent() {
                this.modal = false;
            },
            submit() {
                if (this.isClose) {
                    let tmpData = JSON.parse(JSON.stringify(this.issueList[this.clickRowIndex]));
                    tmpData.status = 4;
                    this.$store.dispatch('testerIssue', Object.assign(tmpData, {
                        testDesc: '',
                        isClose: this.isClose
                    })).then(res => {
                        if (res.status) {
                            this.issueList[this.clickRowIndex].status = 4;
                            this.modal = false;
                            this.$Message.success('问题已关闭');
                        } else {
                            this.$Message.error('操作有误，请重新尝试！');
                        }
                    })
                } else if (this.testDesc) {
                    let tmpData = JSON.parse(JSON.stringify(this.issueList[this.clickRowIndex]));
                    tmpData.status = 1;
                    this.$store.dispatch('testerIssue', Object.assign(tmpData, {
                        testDesc: this.testDesc,
                        isClose: false
                    })).then(res => {
                        if (res.status) {
                            this.issueList[this.clickRowIndex].status = 1;
                            this.modal = false;
                            this.$Message.info('已分发给解决人员');
                        } else {
                            this.$Message.error('操作有误，请重新尝试！');
                        }
                    })
                } else {
                    this.$Message.error('请填写内容！');
                }
            },
            // 显示对话框
            showModal(row) {
                this.clickRowIndex = this.issueIndex.indexOf(row.id);
                this.modal = true;
            },
            getContent(data) {
                console.log(data);
                this.testDesc = data;
            },
            /**
             * 成员 id 转换为昵称
             * @param oldData 旧对象
             * @returns {object} 新对象
             */
            userIdToName(oldData) {
                const attributes = ['issuer', 'dispense', 'developer', 'tester'];
                const peopleData = this.projectList[this.defaultIndex].people;
                oldData.forEach(item => {
                    peopleData.forEach(i => {
                        for (let j = 0; j < attributes.length; j++) {
                            if (i.userId === item[attributes[j]]) {
                                item[attributes[j]] = i.name;
                            }
                        }
                    })
                });
                return oldData;
            },
            checkPermission() {
                if (!this.permission || this.permission[5] !== '1') {
                    this.$router.push({name: 'myProject'});
                    this.$root.Bus.$emit('closeComponent', 'SetDispense');
                    this.$Notice.warning({
                        title: '没有操作权限！',
                        desc: '请联系项目管理人员，分配职责。'
                    });
                }
            }
        },
        computed: {
            ...mapState({
                projectList: state => state.project.projectList,
                defaultIndex: state => state.project.defaultIndex,
                issueList: state => state.issue.issueList,
                permission: state => state.user.permission
            }),
            // 表格总来源数据
            issueData() {
                return this.userIdToName(this.issueList.map(item => Object.assign({}, item)));
            },
            // 表格当前显示的数据
            dataList() {
                return this.issueData.filter(item => item.status === 3);
            }
        },
        created() {
            this.checkPermission();
        },
        mounted() {
            this.issueIndex = this.issueList.map(item => item.id);
        }
    }
</script>

<style scoped>
    .header-font {
        font-size: 14px;
        font-weight: 600;
    }

    .modal-item {
        margin-bottom: 16px;
    }

    .modal-item > p {
        font-size: 14px;
        margin-bottom: 10px;
    }

    .modal-item > span {
        font-size: 14px;
    }
</style>
