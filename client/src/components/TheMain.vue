<template>
    <div>
        <Layout>
            <Header v-bind:style="{ height: headerHeight + 'px' }" class="layout-header">
                <Menu mode="horizontal" theme="light" accordion
                      ref="menu"
                      :active-name="$route.name"
                      @on-select="tagAdd"
                      :style="{ height: headerHeight + 'px' }">
                    <div class="menu-logo">
                        <router-link to="/home">
                            <img src="../assets/images/logo.png" alt="logo" width="40" height="40"/>
                            bug-mgmt
                        </router-link>
                    </div>
                    <div class="menu-search">
                        <Input v-model="SearchValue" icon="ios-search-strong"
                               placeholder="搜索..." style="width: 180px"></Input>
                    </div>
                    <div class="menu-nav">
                        <MenuItem name="issue">
                            <Icon type="ios-paper"></Icon>
                            问题提交
                        </MenuItem>
                        <Submenu name="mgmt">
                            <template slot="title">
                                <Icon type="ios-gear"></Icon>
                                项目配置
                            </template>
                            <MenuItem name="mgmt1">项目信息</MenuItem>
                            <MenuItem name="mgmt2">成员管理</MenuItem>
                            <MenuItem name="mgmt3">用户管理</MenuItem>
                            <MenuItem name="mgmt4">功能模块</MenuItem>
                            <MenuItem name="mgmt5">版本管理</MenuItem>
                        </Submenu>
                        <router-link to="/main/project" :style="{height:'60px'}">
                            <MenuItem name="project">
                                <Icon type="folder"></Icon>
                                我的项目
                            </MenuItem>
                        </router-link>
                        <MenuItem name="message">
                            <Icon type="ios-bell"></Icon>
                            消息提醒
                        </MenuItem>
                        <router-link to="/main/user" :style="{height:'60px'}">
                            <MenuItem name="user">
                                <Badge dot>
                                    <Avatar shape="square" :src="defaultAvatar" icon="person"/>
                                </Badge>
                            </MenuItem>
                        </router-link>
                    </div>
                </Menu>
            </Header>
            <Layout v-bind:style="{ marginTop: headerHeight + 'px' }">
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" width="auto">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px',margin:'0 0 0 200px'}">
                    <base-tag :style="{padding: '4px 0'}"></base-tag>
                    <Content :style="{padding: '0', minHeight: '77vh', background: 'f5f7f9'}">
                        <keep-alive include="">
                            <router-view></router-view>
                        </keep-alive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        <BackTop></BackTop>
    </div>
</template>
<script>
    import BaseTag from './BaseTag';
    import {mapMutations, mapState} from 'vuex';

    export default {
        data() {
            return {
                // 页面兼容属性 width > 630px
                SearchValue: '',
                screenWidth: document.body.clientWidth,
                headerHeight: 60,

                avatar: {
                    name: '',
                    file: 'http://localhost:8000/public/images/'
                },
                menuItem: {
                    issue: {
                        name: '问题提交',
                        url: '/main/issue'
                    },
                    mgmt1: {
                        name: '项目信息',
                        url: ''
                    },
                    mgmt2: {
                        name: '成员管理',
                        url: ''
                    },
                    mgmt3: {
                        name: '用户管理',
                        url: ''
                    },
                    mgmt4: {
                        name: '功能模块',
                        url: ''
                    },
                    mgmt5: {
                        name: '版本管理',
                        url: ''
                    },
                    project: {
                        name: '我的项目',
                        url: '/main/project'
                    },
                    message: {
                        name: '消息提醒',
                        url: '/main/message'
                    },
                    user: {
                        name: '账号设置',
                        url: '/main/user'
                    }
                }
            }
        },
        components: {
            'base-tag': BaseTag
        },
        methods: {
            ...mapMutations({
                add: 'tagAdd'
            }),

            // 点击导航菜单，添加 tag 标签
            tagAdd(tag) {
                this.add({
                    tag,
                    name: this.menuItem[tag].name,
                    url: this.menuItem[tag].url
                });
                // 通过 router-link 跳转，无需再进行跳转
            },

            // 导航栏高度自适应 (页面兼容性)
            changeHeight() {
                if (this.screenWidth <= 1042) this.headerHeight = 120;
                else this.headerHeight = 60;
            }
        },
        computed: {
            ...mapState({
                avatarId: state => state.user.userInfo.avatarId,
            }),
            // 用户头像设置
            defaultAvatar() {
                if (!this.avatarId) {
                    return null;
                } else {
                    console.log(this.avatarId);
                    this.avatar.name = this.avatarId;
                    return this.avatar.file + this.avatar.name;
                }
            }
        },
        created() {
            this.changeHeight();
            this.tagAdd(this.$route.name);
        },
        mounted() {
            // 监听window的resize事件．在窗口变化时再设置宽度
            window.onresize = () => {
                this.screenWidth = document.body.clientWidth;
                this.changeHeight();
            };
        },
        updated() {
            this.$nextTick(() => {
                if (this.$refs.menu) {
                    this.$refs.menu.updateActiveName();
                }
            })
        }
    }
</script>
<style scoped>

    .layout-header {
        background: #fff;
        padding: 0 24px;
        line-height: 60px;
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        min-width: 630px;
        z-index: 1000;
    }

    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
        border-bottom-width: 3px;
        font-size: 15px;
    }

    .menu-logo {
        float: left;
        font-size: 26px;
        margin: 0 60px 0 0;
    }

    .menu-logo a img {
        margin-right: 8px;
        vertical-align: middle;
    }

    .menu-search {
        float: left;
    }

    .menu-nav {
        float: right;
        height: 60px;
    }

    .ivu-layout-sider {
        position: fixed;
        height: 100vh;
        left: 0;
        overflow: auto;
    }

</style>
