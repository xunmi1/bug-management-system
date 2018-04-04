<template>
    <Card>
        <Tabs v-model="tab" type="card">
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
            <Form ref="form" :modal="{people}" label-position="top">
                <FormItem :label="inputName" prop="people">
                    <AutoComplete v-model="people"
                                  transfer
                                  @on-search="peopleSearch">
                        <Option v-for="item in optionData" :value="item.name" :key="item.id">
                            {{ item.name }}
                        </Option>
                    </AutoComplete>
                </FormItem>
            </Form>
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
                tab: '1',
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
                modal: false,
                people: '',
                rules: [],
                optionData: [],    // 下拉列表实际显示的数据
                optionList: [],    // 下拉列表总数据
                inputName: ''
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
                const peopleData = this.projectList[this.defaultIndex].people;
                if (this.tab === '1') {
                    this.inputName = '问题解决人员';
                    this.optionList = peopleData.filter(item => item.permission[4] === '1')
                        .map(item => {
                            return {
                                'name': item.name,
                                'id': item.userId
                            }
                        })
                } else if (this.tab === '2') {
                    this.inputName = '问题测试人员';
                    this.optionList = peopleData.filter(item => item.permission[5] === '1')
                        .map(item => {
                            return {
                                'name': item.name,
                                'id': item.userId
                            }
                        })
                }
                this.modal = true;
            },
            peopleSearch(val) {
                if (val) {
                    this.optionData = this.optionList.filter(item => {
                        if (item.title.search(val) >= 0) return true;
                    })
                        .slice(-5);
                } else {
                    this.optionData = [];
                }
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
            // 表格数据来源
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
