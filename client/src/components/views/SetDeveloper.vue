<template>
    <Card>
        <div slot="title">
            <Tooltip content="单击相关列，进入设置">
                <Icon type="settings"></Icon>
                <span>待解决问题列表</span>
            </Tooltip>
        </div>
        <base-table :columns="columns"
                    :data="dataList"
                    :page-size="10"
                    @on-row-click="showModal"></base-table>
        <Modal v-model="modal"
               :mask-closable="false"
               :styles="{top: '50px',width: '680px'}">
            <div slot="header" class="header-font">
                <span>解决方法</span>
            </div>
            <div slot="close" class="header-font">
                <Button type="text" size="large" @click="refuseIssue">拒绝</Button>
                <Button type="text" size="large" @click="delayIssue">延期</Button>
            </div>
            <div></div>
            <div class="modal-item">
                <p>问题描述：</p>
                <Input v-model="issueName" clearable></Input>
            </div>
            <div class="modal-item">
                <p>解决方法描述：</p>
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
    import BaseEditor from '../base/BaseEditor'

    export default {
        name: "SetDeveloper",
        components: {
            BaseTable,
            BaseEditor
        },
        data() {
            return {
                issueName: '',  //由解决人员重新对问题描述
                solveDesc: '',  // 解决描述
                columns: [
                    {type: 'index', width: 60, title: '序号', align: 'center'},
                    {title: '标题', key: 'title'},
                    {title: '类型', key: 'select'},
                    {title: '模块', key: 'module'},
                    {title: '版本号', key: 'version', sortable: true},
                    {title: '优先级', key: 'priority', sortable: true},
                    {title: '提交', key: 'issuer', sortable: true},
                    {title: '分配', key: 'dispense', sortable: true}
                ],
                modal: false,
                people: '',
                issueIndex: [],  // 所有问题 id 列表，用于快速查找选中问题的索引
                clickRowIndex: ''     // 被选中的问题的索引
            }
        },
        methods: {
            reset() {
                this.modal = false;
                this.issueName = '';
                this.$refs.editor.clearContent();
            },
            tmpContent() {
                this.modal = false;
            },
            submit() {
                if (this.issueName && this.solveDesc) {
                    let tmpData = JSON.parse(JSON.stringify(this.issueList[this.clickRowIndex]));
                    tmpData.status = 2;
                    this.$store.dispatch('developerIssue', Object.assign(tmpData, {
                        issueName: this.issueName,
                        solveDesc: this.solveDesc
                    })).then(res => {
                        if (res.status) {
                            this.issueList[this.clickRowIndex].status = 2;
                            this.modal = false;
                            this.$Message.success('操作成功！');
                        } else {
                            this.$Message.error('提交有误，请重新尝试！');
                        }
                    });
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
                this.solveDesc = data;
            },
            // 拒绝
            refuseIssue() {
                this.$Modal.confirm({
                    onOk: () => {
                        let tmpData = JSON.parse(JSON.stringify(this.issueList[this.clickRowIndex]));
                        tmpData.status = 5;
                        this.$store.dispatch('developerIssue', tmpData).then(res => {
                            if (res.status) {
                                this.issueList[this.clickRowIndex].status = 5;
                                this.modal = false;
                                this.$Message.success('操作成功！');
                            } else {
                                this.$Message.error('操作有误，请重新尝试！');
                            }
                        })
                    },
                    content: '<h3 style="font-size: 15px; margin-bottom: 10px">是否拒绝解决此问题吗？</h3>' +
                    '<p>拒绝后，该问题将被永远关闭, 不能恢复。</p>'
                })
            },
            // 延期
            delayIssue() {
                this.$Modal.confirm({
                    onOk: () => {
                        let tmpData = JSON.parse(JSON.stringify(this.issueList[this.clickRowIndex]));
                        tmpData.status = 6;
                        this.$store.dispatch('developerIssue', tmpData).then(res => {
                            if (res.status) {
                                this.issueList[this.clickRowIndex].status = 6;
                                this.modal = false;
                                this.$Message.success('操作成功！');
                            } else {
                                this.$Message.error('操作有误，请重新尝试！');
                            }
                        })
                    },
                    content: '<h3 style="font-size: 15px; margin-bottom: 10px">是否延长此问题的时限吗？</h3>'
                })
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
                if (!this.permission || this.permission[4] !== '1') {
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
                return this.issueData.filter(item => item.status === 1);
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
</style>
