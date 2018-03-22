<template>
    <Card class="min-height">
        <div slot="title">
            <Icon type="ios-film-outline"></Icon>
            <span>问题列表</span>
        </div>
        <div>
            <Table :columns="columns"
                   :data="submitData"
                   :height="tableHeight"
                   highlight-row></Table>
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
                    {
                        title: '状态',
                        key: 'status',
                        filters: [
                            {
                                label: '待分配',
                                value: 0
                            },
                            {
                                label: '待解决',
                                value: 1
                            },
                            {
                                label: '待测试',
                                value: 2
                            },
                            {
                                label: '完成',
                                value: 3
                            },
                            {
                                label: '已拒绝',
                                value: 4
                            },
                            {
                                label: '延期中',
                                value: 5
                            },
                        ],
                        filterMultiple: true,
                        filterMethod(value, row) {
                            switch (value) {
                                case 0:
                                    return row.status === 0;
                                case 1:
                                    return row.status === 1;
                                case 2:
                                    return row.status === 2;
                                case 3:
                                    return row.status === 3;
                                case 4:
                                    return row.status === 4;
                                case 5:
                                    return row.status === 5;
                            }
                        }
                    },
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
                    // 0: 待分配，1:待解决，2: 待测试，3: 完成，4: 已拒绝(关闭)，5：延期中
                    status: 0
                }]
            }
        },
        methods: {
            /**
             * 设置表的高度
             */
            checkHeight() {

            }
        },
        computed: {
            tableHeight() {
                return this.checkHeight();
            }
        }
    }
</script>

<style scoped>
    .min-height {
        min-height: 500px;
    }
</style>
