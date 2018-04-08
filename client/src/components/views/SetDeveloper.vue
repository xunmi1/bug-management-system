<template>
    <Card>
        <div slot="title">
            <Icon type="settings"></Icon>
            <span>待解决问题列表</span>
        </div>
        <base-table :columns="columns"
                    :data="dataList"
                    :page-size="10"
                    @on-row-click="showModal"
                    ref="baseTable"></base-table>
        <Modal v-model="modal" :mask-closable="false">
            <div slot="header" class="header-font">

            </div>
            <div slot="close"></div>
            <div slot="footer">
                <Button type="text" size="large" @click="resetIssue">取消</Button>
                <Button type="primary" size="large" @click="submitIssue">确定</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
    import {mapState} from 'vuex';
    import BaseTable from '../base/BaseTable';

    export default {
        name: "SetDeveloper",
        components: {
            BaseTable
        },
        data() {
            return {
                columns: [
                    {type: 'index', width: 48, align: 'center'},
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
                optionData: [],    // 下拉列表实际显示的数据
                optionList: [],    // 下拉列表总数据
                clickRowIndex: ''     // 被选中的问题的索引
            }
        },
        methods: {
            submitIssue() {
                const list = this.optionList.map(item => item.name);
                if (list.includes(this.people)) {
                    this.optionList.forEach(item => {
                        if (item.name === this.people) {
                            // 设置属性值
                        }
                    });
                    this.modal = false;
                    this.$Message.success('分配成功!');
                } else {
                    this.$Loading.error();
                    this.$Message.error('人员有误!');
                }
            },
            resetIssue() {
                this.modal = false;
            },
            // 显示对话框
            showModal(row, index) {
                this.clickRowIndex = this.$refs.baseTable.current * 10 - 10 + index;
                this.modal = true;
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
                return this.issueData.filter(item => item.status === 1);
            }
        }
    }
</script>

<style scoped>

</style>
