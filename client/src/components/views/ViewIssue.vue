<template>
    <Card>
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            问题列表
        </p>
        <div>
            <Table :columns="columns" :data="submitData"></Table>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "ViewIssue",
        data() {
            return {
                defaultPanel: '1',
                columns: [
                    {type: 'index', width: 52, align: 'center'},
                    {title: '标题', key: 'title'},
                    {title: '模块', key: 'module'},
                    {title: '版本号', key: 'version', sortable: true},
                    {title: '优先级', key: 'priority', sortable: true},
                    {title: '提交人员', key: 'issuer', sortable: true},
                    {title: '分配人员', key: 'dispense', sortable: true},
                    {title: '解决人员', key: 'developer', sortable: true},
                    {title: '测试人员', key: 'tester', sortable: true}
                ],
                submitData: [{
                    id: '',
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
                    // 0: 已提交，1:已分配，2: 已解决，3: 已测试(结束)，4: 已拒绝(关闭)，5：已延期
                    status: 0
                }]
            }
        }
    }
</script>

<style scoped>

</style>
