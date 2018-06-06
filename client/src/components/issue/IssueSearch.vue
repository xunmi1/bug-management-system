<template>
    <Card class="min-height">
        <div slot="title">
            <Icon type="bug"></Icon>
            <span>问题搜索</span>
        </div>

        <div class="input-center">
            <div class="switch">
                <span>全局搜索</span>
                <Switch size="large" v-model="isShare">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </Switch>
            </div>
            <i-input v-model="inputValue"
                     size="large"
                     placeholder="请输入关键词"
                     class="div-input"
                     style="width: 340px"
                     @on-enter="search">
                <Button icon="ios-search" slot="append" @click="search">搜索</Button>
            </i-input>
        </div>
        <div>
            <Table :columns="columns"
                   :data="issueList"
                   :height="tableHeight"
                   ref="table"
                   highlight-row
                   stripe></Table>
        </div>
        <div class="button-margin">
            <Page :total="total"
                  :current="current"
                  :page-size="10"
                  @on-change="changePage"
                  show-total
                  show-elevator
                  style="float: right"></Page>
        </div>
    </Card>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "IssueSearch",
        data() {
            return {
                modal: false,
                issueData: [],
                projectId: '',
                inputValue: '',
                isShare: true,
                current: 1,
                columns: [
                    {type: 'index', width: 86, title: '序号', align: 'center'},
                    {title: '简述', width: 240, key: 'issueName', align: 'center'},
                    {
                        title: '解决方案', key: 'solveDesc', align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {}, params.row.solveDesc.slice(3, -4)),
                            ]);
                        }
                    },
                    {
                        title: '时间', width: 120, key: 'id', align: 'center',
                        render: (h, params) => {
                            function formatDate(now) {
                                const year = now.getFullYear();
                                const month = now.getMonth() + 1;
                                const date = now.getDate();
                                return year + "年" + month + "月" + date + "日";
                            }

                            const time = formatDate(new Date(Math.round(params.row.id)));
                            return h('div', [
                                h('span', {}, time),
                            ]);
                        }
                    }
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
            changePage(index) {
                this.current = index;
            },
            search() {
                const data = {
                    value: this.inputValue,
                    projectId: this.isShare ? '' : this.projectId
                };
                this.axios.post(process.env.API_HOST + '/issue/search', data).then(res => {
                    if (res.data.status) {
                        this.issueData = res.data.data;
                    } else {
                        this.$Message.warning('搜索失败！');
                    }
                }).catch(e => {
                    console.error(e);
                    this.$Message.warning('请检查网络状况！');
                })
            }
        },
        computed: {
            ...mapState({
                projectList: state => state.project.projectList,
                defaultIndex: state => state.project.defaultIndex,
            }),

            tableHeight() {
                return this.checkHeight();
            },
            total() {
                if (this.issueData) {
                    return this.issueData.length;
                }
            },

            // 表格当前显示的数据
            issueList() {
                return this.issueData.slice((this.current - 1) * 10, Math.min(this.current * 10, this.total));
            }
        },
        watch: {
            defaultIndex: {
                handler: function (val) {
                    if (val >= 0) {
                        this.projectId = this.projectList[val].info.id;
                    }
                },
                immediate: true
            }
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

    .input-center {
        margin: 10px 0 26px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .div-input {

    }

    .switch {
        margin-right: 30px;
    }
</style>
