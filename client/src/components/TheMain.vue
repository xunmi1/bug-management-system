<template>
    <div>
        <Layout>
            <Header v-bind:style="{ height: headerHeight + 'px' }" class="layout-header">
                <Menu mode="horizontal" theme="light" active-name="3">
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
                        <MenuItem name="1">
                            <Icon type="ios-paper"></Icon>
                            问题提交
                        </MenuItem>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-gear"></Icon>
                                项目配置
                            </template>
                            <MenuItem name="2-1">项目信息</MenuItem>
                            <MenuItem name="2-2">成员管理</MenuItem>
                            <MenuItem name="2-3">用户管理</MenuItem>
                            <MenuItem name="2-4">功能模块</MenuItem>
                            <MenuItem name="2-5">版本管理</MenuItem>
                        </Submenu>
                        <router-link to="/main/project" :style="{height:'60px'}">
                            <MenuItem name="3">
                                <Icon type="folder"></Icon>
                                我的项目
                            </MenuItem>
                        </router-link>
                        <MenuItem name="4">
                            <Icon type="ios-bell"></Icon>
                            消息提醒
                        </MenuItem>
                        <MenuItem name="5">
                            <Badge dot>
                                <Avatar shape="square" icon="person"/>
                            </Badge>
                        </MenuItem>
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
                    <base-tag :style="{height: '44px', padding: '4px 0'}"></base-tag>
                    <Content :style="{padding: '0', minHeight: '77vh', background: 'f5f7f9'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import Header from 'iview/src/components/layout/header';

    import BaseTag from './BaseTag';
    export default {
        data() {
            return {
                SearchValue: '',
                // 屏幕兼容 > 630 px
                screenWidth: document.body.clientWidth,
                headerHeight: 60
            };
            components: {
                Header
            }
        },
        components: {
            BaseTag,
            'base-tag': BaseTag
        },
        methods: {
            init: function () {
                if (this.screenWidth <= 1042) this.headerHeight = 120;
                else this.headerHeight = 60;
            }
        },
        mounted() {
            const that = this;
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    that.screenWidth = window.screenWidth;
                })()
            }
        },
        watch: {
            screenWidth(val) {
                if (!this.timer) {
                    this.screenWidth = val;
                    this.timer = true;
                    let that = this;
                    setTimeout(function () {
                        // that.screenWidth = that.$store.state.canvasWidth
                        // console.log(that.screenWidth);
                        that.init();
                        that.timer = false;
                    }, 300)
                }
            }
        }
    }
</script>
<style scoped>

    .layout-header {
        background: #fff;
        padding: 0 24px;
        /*height: 60px;*/
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
