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
                所有成员
                <div slot="content">
                    <Table :columns="columns[0]" :data="allList" ref="selection"
                           highlight-row size="small" :height="tableHeight0" :style="tableStyle"
                           @on-selection-change="setSelectList"></Table>
                    <Page :total="total" size="small" show-total
                          class="page-margin" @on-change="changePage"></Page>
                    <Form :label-width="0" class="table-button" inline
                          ref="newPeopleEmail" :model="{newUserName}">
                        <!--<FormItem :rules="ruleEmail" prop="newPeopleEmail">-->
                        <!--<span style="font-size: 14px">人员添加：</span>-->
                        <!--<AutoComplete v-model="newPeopleEmail" :data="emailSuffix"-->
                        <!--@on-search="searchEmail"-->
                        <!--placeholder="输入邮箱地址" style="width:200px" placement="top">-->
                        <!--</AutoComplete>-->
                        <!--<Button type="primary" @click="pushNewPeopleEmail">添加</Button>-->
                        <!--</FormItem>-->
                        <FormItem :rules="ruleName" prop="newUserName">
                            <span style="font-size: 14px">人员添加：</span>
                            <Input v-model="newUserName" placeholder="输入用户名" style="width: 200px"></Input>
                            <Button type="primary" @click="pushNewPeopleEmail">添加</Button>
                        </FormItem>
                        <FormItem>
                            <span style="font-size: 14px">人员分配：</span>
                            <ButtonGroup>
                                <Button @click="setTask(1)">管理人员</Button>
                                <Button @click="setTask(2)">提交人员</Button>
                                <Button @click="setTask(3)">分配人员</Button>
                                <Button @click="setTask(4)">解决人员</Button>
                                <Button @click="setTask(5)">测试人员</Button>
                            </ButtonGroup>
                        </FormItem>
                    </Form>
                </div>
            </Panel>
            <Panel>
                管理人员
                <div slot="content">
                    <Table :columns="columns[1]" :data="ownerList"
                           size="small" :height="tableHeight1" :style="tableStyle"></Table>
                </div>
            </Panel>
        </Collapse>
        <div class="layout">
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">提交人员</div>
                <div>
                    <Table :columns="columns[2]" :data="issuerList"
                           size="small" :height="tableHeight2" :style="tableStyle"></Table>
                </div>
            </Card>
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">分配人员</div>
                <div>
                    <Table :columns="columns[3]" :data="dispenseList"
                           size="small" :height="tableHeight3" :style="tableStyle"></Table>
                </div>
            </Card>
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">解决人员</div>
                <div>
                    <Table :columns="columns[4]" :data="developerList"
                           size="small" :height="tableHeight4" :style="tableStyle"></Table>
                </div>
            </Card>
            <Card :padding="0" class="flex-item"
                  :style="{width: cardWidth +1 + 'px'}">
                <div slot="title">测试人员</div>
                <div>
                    <Table :columns="columns[5]" :data="testerList"
                           size="small" :height="tableHeight5" :style="tableStyle"></Table>
                </div>
            </Card>
        </div>
        <div class="content-button">
            <ButtonGroup size="large">
                <Button @click="handleReset('people')">取消</Button>
                <Button type="primary" @click="handleSubmit('people')">确定</Button>
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
                type: Array
            }
        },
        data() {
            return {
                newPeopleEmail: '',
                newUserName: '',  //人员添加
                emailSuffix: [],
                ruleEmail: [
                    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                    {type: 'email', message: '邮箱地址不正确', trigger: 'blur'}
                ],
                ruleName: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {type: 'string', min: 6, message: '用户名不少于6位', trigger: 'blur'}
                ],
                people: [],
                selectList: [],       // 主表中被选中行
                current: 1,           // 主表的当前页码
                columns: new Array(6),          // 各个表格表头
                cardWidth: 500,
                tableStyle: {minWidth: this.cardWidth + 'px'}
            }
        },
        methods: {
            // 初始化用户数据
            initData() {
                if (!this.data) {
                    if (this.defaultIndex >= 0) {
                        this.people = JSON.parse(JSON.stringify(this.projectList[this.defaultIndex].people));
                    } else {
                        this.$router.push({name: 'myProject'});
                        this.$root.Bus.$emit('closeComponent', 'ProjectPeople');
                        this.$Notice.warning({
                            title: '没有项目可打开！',
                            desc: '请设置你的默认项目，或者创建新项目。'
                        });
                    }
                } else {
                    this.people = this.data;
                }
            },
            // 初始化表格表头
            initColumns() {
                const column = [
                    {type: 'index', width: 60, title: '序号', align: 'center'},
                    {
                        title: '头像', key: 'avatarId', width: 60,
                        render: (h, params) => {
                            return h('Avatar', {
                                props: {
                                    shape: 'square',
                                    src: params.row.avatarId ?
                                        `http://localhost:8000/public/images/${params.row.avatarId}` : null,
                                    icon: 'person'
                                }
                            });
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
                    {type: 'selection', width: 60, align: 'center'},
                    {
                        title: '操作', key: 'action', width: 86,
                        render: (h, params) => {
                            return h('Button', {
                                props: {type: 'error', size: 'small'},
                                on: {
                                    click: () => {
                                        this.remove(0, params.index)
                                    }
                                }
                            }, '移除');
                        }
                    }
                ]);
                // 设置其他表的表头
                for (let index = 1; index < 6; index++) {
                    this.columns[index] = column.concat({
                        title: '操作', key: 'action', width: 86,
                        render: (h, params) => {
                            return h('Button', {
                                props: {type: 'error', size: 'small'},
                                on: {
                                    click: () => {
                                        this.remove(index, params.index)
                                    }
                                }
                            }, '移除');
                        }
                    });
                }
            },

            /**
             * 设置表的高度
             * @param data 当前数据列表的名称
             * @returns {number} 表高度的值
             */
            checkHeight(data) {
                if (this[data]) {
                    if (data === 'allList') {
                        return (this.total < 10 ? (this.total < 3 ? 3 : this.total) : 10) * 40 + 32;
                    } else {
                        const length = this[data].length;
                        return (length < 6 ? (length < 3 ? 3 : length) : 10) * 40 + 32;
                    }
                }
            },
            changePage(index) {
                this.current = index;
            },
            searchEmail(value) {
                this.emailSuffix = !value || value.indexOf('@') >= 0 ? [] : [
                    value + '@qq.com', value + '@163.com', value + '@sina.com',
                    value + '@126.com', value + '@outlook.com'
                ];
            },
            /**
             * 新成员添加（主表）
             */
            pushNewPeopleEmail() {
                this.$refs.newPeopleEmail.validate((valid) => {
                    if (valid) {
                        /**
                         * 1、验证用户是否存在，若存在，则返回此用户相关数据
                         * 2、通过 userId 验证列表中是否已存在
                         */
                        const isHave = this.allList.some(item => item.name === this.newUserName.toString());
                        if (isHave) {
                            this.$Message.error('该用户已经是项目成员！');
                        } else {
                            this.$store.dispatch('nameCheck', {name: this.newUserName}).then(res => {
                                if (res.status) {
                                    this.$Message.error('未找到该用户信息！');
                                } else {
                                    this.people.push({
                                        userId: res.data.userId,
                                        name: res.data.userName,
                                        email: res.data.userName,
                                        desc: res.data.userDesc,
                                        avatarId: res.data.userAvatar,
                                        issue: 0, dispense: 0, solve: 0, test: 0, permission: '100000'
                                    });
                                    this.$Message.success('添加成功!');
                                }
                            });
                        }
                    } else {
                        this.$Message.error('填写有误!');
                    }
                })
            },
            // 获取所有选中行（数组）
            setSelectList(rows) {
                this.selectList = rows;
            },
            /**
             * 成员添加
             * @param tableIndex 当前表的索引
             */
            setTask(tableIndex) {
                this.selectList.forEach(row => {
                    this.people.forEach((i, index) => {
                        if (i.userId === row.userId) {
                            const tmp = i.permission.split('');
                            tmp.splice(tableIndex, 1, '1');
                            i.permission = tmp.join('');
                        }
                    });
                });
            },
            /**
             * 成员移除
             * @param tableIndex 当前表的索引
             * @param rowIndex 准备移除的行的索引
             */
            remove(tableIndex, rowIndex) {
                const table = ['allList', 'ownerList', 'issuerList', 'dispenseList', 'developerList', 'testerList'];
                rowIndex = this.people.indexOf(this[table[tableIndex]][rowIndex]);
                switch (tableIndex) {
                    case 0:
                        if (this.people[rowIndex].userId === this.userId) {
                            this.$Message.error('禁止移除！');
                        } else {
                            this.people.splice((this.current - 1) * 10 + rowIndex, 1);
                            this.$Message.success('成员移除成功！');
                        }
                        break;
                    case 1:
                        if (this.people[rowIndex].userId === this.userId) {
                            this.$Message.error('禁止移除！');
                        } else {
                            const tmp = this.people[rowIndex].permission.split('');
                            tmp.splice(1, 1, '0');
                            this.people[(this.current - 1) * 10 + rowIndex].permission = tmp.join('');
                            this.$Message.success('成员移除成功！');
                        }
                        break;
                    default :
                        const tmp = this.people[rowIndex].permission.split('');
                        tmp.splice(tableIndex, 1, '0');
                        this.people[rowIndex].permission = tmp.join('');
                        this.$Message.success('成员移除成功！');
                }
            },

            handleSubmit(name) {
                if (!this.data) {
                    this.$store.dispatch('setProjectPeople', this.people).then(res => {
                        if (res.status) {
                            this.$Message.success('修改成功！');
                        } else {
                            this.$Notice.error({
                                title: '修改失败！',
                                desc: '请检查网络状况，并重新点击确认'
                            });
                        }
                    });
                } else {
                    this.$emit('update:data', this[name]);
                    this.$emit('on-ok');
                }
            },
            handleReset(name) {
                this.initData();
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList,
                userId: state => state.user.userInfo.userId
            }),
            allList() {
                return this.people.slice((this.current - 1) * 10, Math.min(this.current * 10, this.total));
            },
            // 管理人员
            ownerList() {
                return this.people.filter(item => item.permission[1] === '1');
            },
            // 提交人员
            issuerList() {
                return this.people.filter(item => item.permission[2] === '1');
            },
            // 分配人员
            dispenseList() {
                return this.people.filter(item => item.permission[3] === '1');
            },
            // 解决人员
            developerList() {
                return this.people.filter(item => item.permission[4] === '1');
            },
            // 测试人员
            testerList() {
                return this.people.filter(item => item.permission[5] === '1');
            },
            total() {
                if (this.people) {
                    return this.people.length;
                }
            },
            // 表格高度自适应设置
            tableHeight0() {
                return this.checkHeight('allList');
            },
            tableHeight1() {
                return this.checkHeight('ownerList');
            },
            tableHeight2() {
                return this.checkHeight('issuerList');
            },
            tableHeight3() {
                return this.checkHeight('dispenseList');
            },
            tableHeight4() {
                return this.checkHeight('developerList');
            },
            tableHeight5() {
                return this.checkHeight('testerList');
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
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: flex-start;
    }

    .flex-item {
        flex-grow: 1;
        margin: 10px;
    }

    .table-button {
        margin: 48px 0 8px;
    }

    .table-button > div:first-child {
        margin-right: 30px;
    }

    .page-margin {
        margin: 10px 0;
        float: right;
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
