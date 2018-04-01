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
        </div>
        <div class="button-margin">
            <Page :total="total"
                  :current="current"
                  :page-size="10"
                  show-total
                  show-elevator
                  style="float: right"></Page>
            <Button type="primary" size="large" @click="exportData">
                <Icon type="ios-download-outline"></Icon>
                数据导出
            </Button>
        </div>
    </Card>
</template>

<script>
    import {mapState} from 'vuex';

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
                                    [color, text] = ['#fa2', '待分配'];
                                    break;
                                case 1:
                                    [color, text] = ['#ed3f14', '待解决'];
                                    break;
                                case 2:
                                    [color, text] = ['#805d14', '待分配'];
                                    break;
                                case 3:
                                    [color, text] = ['#2d8cf0', '待测试'];
                                    break;
                                case 4:
                                    [color, text] = ['#19be6b', '已完成'];
                                    break;
                                case 5:
                                    [color, text] = ['#80848f', '已拒绝'];
                                    break;
                                case 6:
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
                ]
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
                    if (data.hasOwnProperty(key) && typeof data[key] !== 'function') {
                        value = data[key];
                        issues.push({key, value});
                    }
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
            },
            /**
             * 成员 id 转换为昵称
             * @param data 旧对象
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
                issues: state => state.issue.issueList,
            }),
            tableHeight() {
                return this.checkHeight();
            },
            total() {
                if (this.issueData) {
                    return this.issueData.length;
                }
            },
            issueData() {
                return this.userIdToName(this.issues.map(item => Object.assign({}, item)));
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

    .button-margin {
        margin: 16px 0;
    }
</style>
