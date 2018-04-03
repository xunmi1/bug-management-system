<template>
    <Card>
        <Tabs value="1" type="card">
            <TabPane label="解决人员分配" name="1">
                <base-table :columns="columns[0]"
                            :data="dataList0"
                            :page-size="10"
                            @on-row-click="showModal"></base-table>
            </TabPane>
            <TabPane label="测试人员分配" name="2">
                <base-table :columns="columns[1]"
                            :data="dataList1"
                            :page-size="10"
                            @on-row-click="showModal"></base-table>
            </TabPane>
        </Tabs>
        <Modal v-model="modal" :mask-closable="false">
            <div slot="header" class="header-font">
                <Icon type="log-out" class="icon-color"></Icon>
                <span>分配</span>
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
        name: "SetDispense",
        components: {
            BaseTable
        },
        data() {
            return {
                columns: [
                    [
                        {type: 'index', width: 48, align: 'center'},
                        {title: '标题', key: 'title'},
                        {title: '类型', key: 'select'},
                        {title: '模块', key: 'module'},
                        {title: '版本号', key: 'version', sortable: true},
                        {title: '优先级', key: 'priority', sortable: true},
                        {title: '提交', key: 'issuer', sortable: true},
                    ],
                    [
                        {type: 'index', width: 48, align: 'center'},
                        {title: '标题', key: 'title'},
                        {title: '类型', key: 'select'},
                        {title: '模块', key: 'module'},
                        {title: '版本号', key: 'version', sortable: true},
                        {title: '优先级', key: 'priority', sortable: true},
                        {title: '提交', key: 'issuer', sortable: true},
                        {title: '解决', key: 'developer', sortable: true}
                    ]
                ],
                modal: false
            }
        },
        methods: {
            submitIssue() {
                this.modal = false;
            },
            resetIssue() {
                this.modal = false;
            },
            showModal(row, index) {
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
                issues: state => state.issue.issueList
            }),
            issueData() {
                return this.userIdToName(this.issues.map(item => Object.assign({}, item)));
            },
            dataList0() {
                return this.issueData.filter(item => item.status === 0)
            },
            dataList1() {
                return this.issueData.filter(item => item.status === 2)
            }
        }
    }
</script>

<style scoped>
    .header-font {
        font-weight: 500;
        font-size: 16px;
    }

    .icon-color {
        color: #2d8cf0;
        font-size: 16px;
    }
</style>
