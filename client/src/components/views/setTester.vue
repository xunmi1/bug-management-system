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
                    @on-row-click="showModal"
                    ref="baseTable"></base-table>
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
    import BaseEditor from '../base/BaseEditor'

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
                this.modal = false;
            },
            // 显示对话框
            showModal(row, index) {
                this.clickRowIndex = this.$refs.baseTable.current * 10 - 10 + index;
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
            }
        },
        computed: {
            ...mapState({
                projectList: state => state.project.projectList,
                defaultIndex: state => state.project.defaultIndex,
                issueList: state => state.issue.issueList
            }),
            // 表格总来源数据
            issueData() {
                return this.userIdToName(this.issueList.map(item => Object.assign({}, item)));
            },
            // 表格当前显示的数据
            dataList() {
                return this.issueData.filter(item => item.status === 3);
            }
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
