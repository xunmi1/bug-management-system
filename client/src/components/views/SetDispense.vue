<template>
    <Card>
        <Tabs value="1" type="card">
            <TabPane label="解决人员分配" name="1">
                <base-table :columns="columns[0]"
                            :data="dataList0"
                            :page-size="10"></base-table>
            </TabPane>
            <TabPane label="测试人员分配" name="2">
                <base-table :columns="columns[1]"
                            :data="dataList1"
                            :page-size="10"></base-table>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
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
                        {title: '分配', key: 'dispense', sortable: true},
                        {title: '解决', key: 'developer', sortable: true}
                    ]],
                issueData: [{
                    id: '12121212',
                    title: '123',
                    select: 'bug',
                    severity: 2,
                    version: '',
                    project: '',
                    module: '',
                    text: '',
                    issuer: '',
                    dispense: '',
                    developer: '',
                    tester: '',
                    priority: 2,
                    versionEnd: '',
                    startDate: '',
                    endDate: '',
                    // 0: 待分配(解决)，1:待解决，2:待分配(测试)，3: 待测试，4: 完成，5: 已拒绝(关闭)，6：延期中
                    status: 0
                }]
            }
        },
        methods: {},
        computed: {
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

</style>
