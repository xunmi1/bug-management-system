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
                   highlight-row
                   stripe
                   @on-row-dblclick="showIssue"></Table>
            <Page :total="total"
                  show-total
                  show-elevator
                  class="page-margin"></Page>
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
                            {label: '待分配', value: 0},
                            {label: '待解决', value: 1},
                            {label: '待测试', value: 2},
                            {label: '已完成', value: 3},
                            {label: '已拒绝', value: 4},
                            {label: '延期中', value: 5}
                        ],
                        filterMultiple: true,
                        filterMethod: this.filterMethod,
                        render: (h, params) => {
                            const status = params.row.status;
                            let color, text;
                            switch (status) {
                                case 0:
                                    [color, text] = ['#f90', '待分配'];
                                    break;
                                case 1:
                                    [color, text] = ['#ed3f14', '待解决'];
                                    break;
                                case 2:
                                    [color, text] = ['#2d8cf0', '待测试'];
                                    break;
                                case 3:
                                    [color, text] = ['#19be6b', '已完成'];
                                    break;
                                case 4:
                                    [color, text] = ['#80848f', '已拒绝'];
                                    break;
                                case 5:
                                    [color, text] = ['#ef6Aff', '延期中'];
                                    break;
                            }
                            return h('Tag', {
                                props: {
                                    color: color
                                }
                            }, text);
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
                }],
            }
        },
        methods: {
            /**
             * 设置表的高度
             */
            checkHeight() {

            },
            /**
             *  表数据筛选
             * @param value 筛选条件
             * @param row 行数据
             * @returns {boolean} true: 显示, false: 过滤掉
             */
            filterMethod(value, row) {
                return row.status === value;
            },
            showIssue(data, index) {
                this.$Modal.info({
                    title: '详细信息',
                    render: h => {
                        return h('h3', {}, data.title);
                    }
                });
            }
        },
        computed: {
            tableHeight() {
                return this.checkHeight();
            },
            total() {
                if (this.submitData) {
                    return this.submitData.length;
                }
            },
        }
    }
</script>

<style scoped>
    .min-height {
        min-height: 500px;
    }

    .page-margin {
        margin: 16px 0;
        float: right;
    }
</style>
