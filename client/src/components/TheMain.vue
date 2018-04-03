<template>
    <div id="background-height">
        <Layout>
            <Header :style="{ height: headerHeight + 'px' }" class="layout-header">
                <Menu mode="horizontal"
                      theme="light" accordion
                      ref="horizontalMenu"
                      :active-name="$route.name"
                      @on-select="tagAdd"
                      :style="{ height: headerHeight + 'px' }">
                    <div class="menu-logo">
                        <router-link to="/home">
                            <img src="../assets/images/logo.png" alt="logo" width="40" height="40"/>
                            <span>bug-mgmt</span>
                        </router-link>
                    </div>
                    <div class="menu-search">
                        <Input v-model="SearchValue"
                               icon="ios-search-strong"
                               placeholder="搜索..."
                               style="width: 180px"></Input>
                    </div>
                    <div class="menu-nav">
                        <MenuItem name="issue" @click.native="setModal('issue', true)">
                            <Icon type="compose"></Icon>
                            问题提交
                        </MenuItem>
                        <Submenu name="mgmt">
                            <template slot="title">
                                <Icon type="ios-gear"></Icon>
                                项目配置
                            </template>
                            <MenuItem name="projectInfo">
                                <Icon type="ios-paper"></Icon>
                                项目信息
                            </MenuItem>
                            <MenuItem name="projectPeople">
                                <Icon type="android-person-add"></Icon>
                                成员管理
                            </MenuItem>
                            <MenuItem name="projectModules">
                                <Icon type="cube"></Icon>
                                功能模块
                            </MenuItem>
                            <MenuItem name="projectVersions">
                                <Icon type="pull-request"></Icon>
                                版本管理
                            </MenuItem>
                        </Submenu>
                        <MenuItem name="myProject">
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
                            <MenuItem name="exit" @click.native="setModal('exit', true)">退出系统</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{marginTop: headerHeight + 'px'}">
                <Sider :style="{background: '#fff'}" :width="sidebarWidth">
                    <Menu theme="light"
                          @on-select="tagAdd"
                          width="auto"
                          :active-name="$route.name"
                          ref="verticalMenu">
                        <MenuItem name="viewProject">
                            <Icon type="ios-paper-outline" size="16"></Icon>
                            项目概况
                        </MenuItem>
                        <MenuItem name="viewIssue">
                            <Icon type="clipboard" size="16"></Icon>
                            问题概况
                        </MenuItem>
                        <MenuGroup title="未完成">
                            <MenuItem name="setDispense">
                                <Icon type="log-out" size="16"></Icon>
                                待分配
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="compose"></Icon>
                                待解决
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="compose"></Icon>
                                待测试
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="已完成">
                            <MenuItem name="4">
                                <Icon type="compose"></Icon>
                                已分配
                            </MenuItem>
                            <MenuItem name="5">
                                <Icon type="compose"></Icon>
                                已解决
                            </MenuItem>
                            <MenuItem name="6">
                                <Icon type="compose"></Icon>
                                已测试
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 0 24px', margin:`0 0 0 ${sidebarWidth}px`}">
                    <base-tag :style="{padding: '4px 0'}"></base-tag>
                    <Content :style="{padding: '0'}">
                        <keep-alive :include="aliveList">
                            <router-view></router-view>
                        </keep-alive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        <div>
            <issue-modal :modal-status="modal.issue" @on-close="setModal('issue', false)"></issue-modal>
            <exit-modal :modal-status="modal.exit" @on-close="setModal('exit', false)"></exit-modal>
            <BackTop></BackTop>
        </div>
    </div>
</template>
<script>
    import {mapMutations, mapState} from 'vuex';
    import BaseTag from './base/BaseTag';
    import IssueModal from './issue/IssueModal';
    import ExitModal from './ExitModal';

    export default {
        name: 'TheMain',
        data() {
            return {
                SearchValue: '',
                screenWidth: document.body.clientWidth,
                headerHeight: 60,
                sidebarWidth: 180,

                avatar: {
                    name: '',
                    file: 'http://localhost:8000/public/images/'
                },
                modal: {
                    issue: false,
                    exit: false
                },
            }
        },
        components: {
            BaseTag,
            IssueModal,
            ExitModal
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
                        title: this.menuItem[tag].title,
                        name: this.menuItem[tag].name
                    });
                    this.$router.push({name: tag});
                }
            },
            setModal(name, bool) {
                this.modal[name] = bool;
            },

            // 导航栏高度自适应 (页面兼容性)
            changeHeight() {
                if (this.screenWidth <= 1056) this.headerHeight = 120;
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
                menuItem: state => state.tagState.menuList,
                tagList: state => state.tagState.list
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
            },
            /**
             * 组件缓存动态销毁
             * 实时遍历 tag 标签数组，返回包含当前组件名的新数组
             */
            aliveList() {
                return this.tagList.map(item => {
                    return item.name;
                });
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
                if (this.$refs.horizontalMenu) {
                    this.$refs.horizontalMenu.updateActiveName();
                }
                if (this.$refs.verticalMenu) {
                    this.$refs.verticalMenu.updateActiveName();
                }
            })
        }
    }
</script>
<style scoped>
    #background-height {
        min-height: 100vh;
        background-color: #f9f9f9;
    }

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
        vertical-align: middle;
    }

    .menu-search {
        float: left;
    }

    .menu-nav {
        float: right;
        height: 60px;
    }

    .ivu-menu-vertical .ivu-menu-item {
        font-size: 15px;
    }

    .ivu-layout-sider {
        position: fixed;
        height: 100vh;
        left: 0;
        overflow: auto;
    }
</style>
