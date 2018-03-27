<template>
    <Card class="min-height">
        <div slot="title">
            <Icon type="ios-film-outline"></Icon>
            <span>问题列表</span>
        </div>
        <div>
            <Table :columns="columns"
                   :data="issueList"
                   :height="tableHeight"
                   ref="table"
                   highlight-row
                   stripe
                   @on-row-click="showIssue"></Table>
            <Page :total="total"
                  :current="current"
                  :page-size="10"
                  show-total
                  show-elevator
                  class="page-margin"></Page>
        </div>
        <div class="button-margin">
            <Button type="primary" size="large" @click="exportData">
                <Icon type="ios-download-outline"></Icon>
                数据导出
            </Button>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "ViewIssue",
        data() {
            return {
                current: 1,
                columns: [
                    {type: 'index', width: 48, align: 'center'},
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
                    {title: '类型', key: 'select'},
                    {title: '模块', key: 'module'},
                    {title: '版本号', key: 'version', sortable: true},
                    {title: '优先级', key: 'priority', sortable: true},
                    {title: '提交', key: 'issuer', sortable: true},
                    {title: '分配', key: 'dispense', sortable: true},
                    {title: '解决', key: 'developer', sortable: true},
                    {title: '测试', key: 'tester', sortable: true}
                ],
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
                return Math.min(Math.max(this.total, 5), 10) * 48 + 40;
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
                let issues = [], value;
                for (let key in data) {
                    value = data[key];
                    issues.push({key, value});
                }
                this.$Modal.info({
                    width: 520,
                    render: h => {
                        return h('Table', {
                            props: {
                                data: issues.slice(1),
                                columns: [
                                    {key: 'key'},
                                    {key: 'value'}
                                ],
                                size: 'small',
                                height: 400,
                                width: 480,
                                border: true,
                                showHeader: false,
                            }
                        });
                    }
                });
            },
            // 问题列表导出
            exportData() {
                this.$refs.table.exportCsv({
                    filename: '问题列表'
                });
            }
        },
        computed: {
            tableHeight() {
                return this.checkHeight();
            },
            total() {
                if (this.issueData) {
                    return this.issueData.length;
                }
            },
            issueList() {
                return this.issueData.slice((this.current - 1) * 10, Math.min(this.current * 10, this.total));
            },
        }
    }
</script>

<style scoped>
    .min-height {
        min-height: 530px;
    }

    .page-margin {
        margin: 16px 0;
        float: right;
    }

    .button-margin {
        margin: 16px 0;
    }
</style>
