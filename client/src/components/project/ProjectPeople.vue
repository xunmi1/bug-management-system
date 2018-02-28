<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <slot name="header">
            <div class="header">
                <Icon type="android-person-add fa-fw" style="color: #2d8cf0"></Icon>
                成员管理
            </div>
        </slot>
        <Collapse class="collapse">
            <Panel>
                所有人员
                <div slot="content">
                    <Table :columns="columns[0]" :data="tableAllList"
                           size="small" :height="tableHeight" :style="tableStyle"></Table>
                    <Page :total="total" size="small" show-total
                          style="margin: 10px 0; float: right" @on-change="changePage"></Page>
                </div>
            </Panel>
            <Panel>
                管理人员
                <div slot="content">
                    <Table :columns="columns[1]" :data="projectPeople.ownerList"
                           size="small" height="272" :style="tableStyle"></Table>
                </div>
            </Panel>
        </Collapse>
        <div class="layout">
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">提交人员</div>
                <div>
                    <Table :columns="columns[2]" :data="projectPeople.issuerList"
                           size="small" height="272" :style="tableStyle"></Table>
                </div>
            </Card>
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">分配人员</div>
                <div>
                    <Table :columns="columns[3]" :data="projectPeople.dispenseList"
                           size="small" height="272" :style="tableStyle"></Table>
                </div>
            </Card>
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">解决人员</div>
                <div>
                    <Table :columns="columns[4]" :data="projectPeople.developerList"
                           size="small" height="272" :style="tableStyle"></Table>
                </div>
            </Card>
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">测试人员</div>
                <div>
                    <Table :columns="columns[5]" :data="projectPeople.testerList"
                           size="small" height="272" :style="tableStyle"></Table>
                </div>
            </Card>
        </div>
        <div class="content-button">
            <ButtonGroup size="large">
                <Button type="primary" @click="handleSubmit('projectPeople')">确定</Button>
                <Button @click="handleReset('projectPeople')">取消</Button>
            </ButtonGroup>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ProjectPeople",
        props: {
            isBordered: {
                type: Boolean,
                default: true
            },
            data: {
                type: Object
            }
        },
        data() {
            return {
                projectPeople: {},
                current: 1,          // 所有人员表格的当前页码
                columns: [],
                cardWidth: 500,
                tableStyle: {minWidth: this.cardWidth + 'px'}
            }
        },
        methods: {
            // 初始化用户数据
            initData() {
                if (!this.data) {
                    const statePeople = this.projectList[this.defaultIndex].people;
                    this.projectPeople = Object.assign({}, statePeople);
                } else {
                    this.projectPeople = Object.assign({}, this.data);
                }
            },
            // 初始化表格表头
            initColumns() {
                const column = [
                    {type: 'index', width: 52, align: 'center'},
                    {
                        title: '头像', key: 'avatarId', width: 60,
                        render: (h, params) => {
                            return h('div', [
                                h('Avatar', {
                                    props: {
                                        shape: 'square',
                                        src: params.row.avatarId ?
                                            `http://localhost:8000/public/images/${params.row.avatarId}` : null,
                                        icon: 'person'
                                    }
                                })
                            ]);
                        }
                    },
                    {title: '用户名', key: 'name'},
                    {title: '邮箱', key: 'email'}
                ];
                this.columns[0] = column.concat([
                    {title: '提交数', key: 'issue', align: 'center', sortable: true},
                    {title: '分配数', key: 'dispense', align: 'center', sortable: true},
                    {title: '解决数', key: 'solve', align: 'center', sortable: true},
                    {title: '测试数', key: 'test', align: 'center', sortable: true},
                    {
                        title: '操作', key: 'action', width: 86,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {type: 'error', size: 'small'},
                                    on: {
                                        click: () => {
                                            this.remove('allList', params.index)
                                        }
                                    }
                                }, '移除')
                            ]);
                        }
                    }]);
                this.columns[1] = column.concat({
                    title: '操作', key: 'action', width: 86,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {type: 'error', size: 'small'},
                                on: {
                                    click: () => {
                                        this.remove('ownerList', params.index)
                                    }
                                }
                            }, '移除')
                        ]);
                    }
                });
                this.columns[2] = column.concat({
                    title: '操作', key: 'action', width: 86,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {type: 'error', size: 'small'},
                                on: {
                                    click: () => {
                                        this.remove('issuerList', params.index)
                                    }
                                }
                            }, '移除')
                        ]);
                    }
                });
                this.columns[3] = column.concat({
                    title: '操作', key: 'action', width: 86,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {type: 'error', size: 'small'},
                                on: {
                                    click: () => {
                                        this.remove('dispenseList', params.index)
                                    }
                                }
                            }, '移除')
                        ]);
                    }
                });
                this.columns[4] = column.concat({
                    title: '操作', key: 'action', width: 86,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {type: 'error', size: 'small'},
                                on: {
                                    click: () => {
                                        this.remove('developerList', params.index)
                                    }
                                }
                            }, '移除')
                        ]);
                    }
                });
                this.columns[5] = column.concat({
                    title: '操作', key: 'action', width: 86,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {type: 'error', size: 'small'},
                                on: {
                                    click: () => {
                                        this.remove('testerList', params.index)
                                    }
                                }
                            }, '移除')
                        ]);
                    }
                });
            },
            remove(data, index) {
                if (data === 'allList') {
                    this.projectPeople[data].splice((this.current - 1) * 10 + index, 1);
                } else {
                    this.projectPeople[data].splice(index, 1);
                }
                this.$Message.success('成员移除成功！');
            },
            changePage(index) {
                this.current = index;
            },
            handleSubmit(name) {
                if (!this.data) {
                    if (true) {
                        this.$Message.success('修改成功！');
                    } else {
                        this.$Message.error('修改失败！');
                    }
                } else {
                    if (true) {
                        this.$emit('update:data', this.projectPeople);
                        this.$emit('on-ok');
                    }
                }
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            }),
            total() {
                if (this.projectPeople.allList) {
                    return this.projectPeople.allList.length;
                }
            },
            tableHeight() {
                return this.total < 10 ? this.total * 40 + 32 : 432;
            },
            tableAllList() {
                if (this.projectPeople.allList) {
                    return this.projectPeople.allList.slice((this.current - 1) * 10,
                        this.current * 10 <= this.total ? this.current * 10 : this.total);
                }
            }
        },
        mounted() {
            this.initData();
            this.initColumns();
        }
    }
</script>

<style scoped>
    .padding {
        padding: 30px 24px;
        background-color: #fff;
        border-radius: 4px;
    }

    .bordered {
        border: 1px solid #dddee1;
        position: relative;
        transition: all .2s ease-in-out;
    }

    .bordered:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        border-color: #eee;
    }

    .header {
        position: relative;
        font-size: 15px;
        border-bottom: 1px solid #e9eaec;
        top: -14px;
        padding-bottom: 16px;
        line-height: 1;
    }

    .collapse {
        font-size: 14px;
        margin: 0 10px 10px;
    }

    .layout {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: flex-start;
    }

    .flex-item {
        flex-grow: 1;
        margin: 10px;
    }

    .content-button {
        width: 100%;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        text-align: center;
    }

    .content-button button {
        width: 100px;
    }
</style>
