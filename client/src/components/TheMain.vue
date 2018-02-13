<template>
    <div>
        <Layout>
            <Header v-bind:style="{ height: headerHeight + 'px' }" class="layout-header">
                <Menu mode="horizontal" theme="light" accordion ref="menu"
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
                        <MenuItem name="issue" @click.native="setModal('issue')">
                            <Icon type="ios-compose"></Icon>
                            问题提交
                        </MenuItem>
                        <Submenu name="mgmt">
                            <template slot="title">
                                <Icon type="ios-gear"></Icon>
                                项目配置
                            </template>
                            <MenuItem name="mgmt1">
                                <Icon type="ios-paper"></Icon>
                                项目信息
                            </MenuItem>
                            <MenuItem name="mgmt2">
                                <Icon type="android-person-add"></Icon>
                                成员管理
                            </MenuItem>
                            <MenuItem name="mgmt3">
                                <Icon type="cube"></Icon>
                                功能模块
                            </MenuItem>
                            <MenuItem name="mgmt4">
                                <Icon type="pull-request"></Icon>
                                版本管理
                            </MenuItem>
                        </Submenu>
                        <MenuItem name="project">
                            <Icon type="folder"></Icon>
                            我的项目
                        </MenuItem>
                        <Submenu name="options">
                            <template slot="title">
                                <Icon type="navicon-round"></Icon>
                                其他功能
                            </template>
                            <MenuItem name="retrieval">
                                <Icon type="bug"></Icon>
                                BUG 检索
                            </MenuItem>
                            <MenuItem name="more">
                                <Icon type="more"></Icon>
                                开发中...
                            </MenuItem>
                        </Submenu>
                        <Submenu name="user">
                            <template slot="title">
                                <Avatar shape="square" :src="defaultAvatar" icon="person" id="avatar"/>
                            </template>
                            <MenuItem name="user">账号设置</MenuItem>
                            <MenuItem name="exit" @click.native="setModal('exit')">退出系统</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{marginTop: headerHeight + 'px'}">
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
                <Layout :style="{padding: '0 24px 24px', margin:'0 0 0 200px'}">
                    <base-tag :style="{padding: '4px 0'}"></base-tag>
                    <Content :style="{padding: '0', minHeight: '77vh', background: 'f5f7f9'}">
                        <keep-alive include="">
                            <router-view></router-view>
                        </keep-alive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        <base-modal :modal="modal"></base-modal>
        <BackTop></BackTop>
    </div>
</template>
<script>
    import {mapMutations, mapState} from 'vuex';
    import BaseTag from './BaseTag';
    import BaseModal from './BaseModal';

    export default {
        data() {
            return {
                SearchValue: '',
                screenWidth: document.body.clientWidth,
                headerHeight: 60,

                avatar: {
                    name: '',
                    file: 'http://localhost:8000/public/images/'
                },
                modal: {
                    issue: false,
                    exit: false
                },
                menuItem: {
                    mgmt1: {
                        name: '项目信息',
                        url: ''
                    },
                    mgmt2: {
                        name: '成员管理',
                        url: ''
                    },
                    mgmt3: {
                        name: '功能模块',
                        url: ''
                    },
                    mgmt4: {
                        name: '版本管理',
                        url: ''
                    },
                    project: {
                        name: '我的项目',
                        url: '/main/project'
                    },
                    retrieval: {
                        name: 'BUG 检索',
                        url: '/main/retrieval'
                    },
                    user: {
                        name: '账号设置',
                        url: '/main/user'
                    }
                }
            }
        },
        components: {
            'base-tag': BaseTag,
            'base-modal': BaseModal
        },
        methods: {
            ...mapMutations({
                add: 'tagAdd'
            }),

            // 点击导航菜单，添加 tag 标签
            tagAdd(tag) {
                if (this.menuItem[tag]) {
                    this.add({
                        tag,
                        name: this.menuItem[tag].name,
                        url: this.menuItem[tag].url
                    });
                    this.$router.push({path: this.menuItem[tag].url});
                }
            },
            setModal(name) {
                this.modal[name] = true;
            },

            // 导航栏高度自适应 (页面兼容性)
            changeHeight() {
                if (this.screenWidth <= 1064) this.headerHeight = 120;
                else this.headerHeight = 60;
            },
            // 删除头像右边的 '^' 对应的节点
            removeAvatarI() {
                const avatarSibling = document.getElementById('avatar').nextElementSibling;
                const avatarParent = document.getElementById('avatar').parentNode;
                avatarParent.removeChild(avatarSibling);
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
            this.removeAvatarI();
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
