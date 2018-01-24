<template>
    <div>
        <Layout>
            <Header>
                <Menu mode="horizontal" :theme="light" active-name="1">
                    <div class="menu-logo">
                        <a href="/">
                            <img src="../assets/images/logo.png" alt="logo" width="40" height="40"/>bug-mgmt
                        </a>
                    </div>
                    <div class="menu-search">
                        <Input v-model="SearchValue" icon="ios-search-strong" placeholder="搜索..."
                               style="width: 200px"></Input>
                    </div>
                    <div class="menu-nav">
                        <MenuItem name="1">
                            <Icon type="ios-paper"></Icon>
                            内容管理
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-people"></Icon>
                            用户管理
                        </MenuItem>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="stats-bars"></Icon>
                                统计分析
                            </template>
                            <MenuGroup title="使用">
                                <MenuItem name="3-1">新增和启动</MenuItem>
                                <MenuItem name="3-2">活跃分析</MenuItem>
                                <MenuItem name="3-3">时段分析</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="留存">
                                <MenuItem name="3-4">用户留存</MenuItem>
                                <MenuItem name="3-5">流失用户</MenuItem>
                            </MenuGroup>
                        </Submenu>
                        <MenuItem name="4">
                            <Icon type="settings"></Icon>
                            综合设置
                        </MenuItem>
                        <Badge dot style="margin: 0 20px">
                            <Avatar shape="square" icon="person"/>
                        </Badge>
                    </div>
                </Menu>
            </Header>
            <Layout style="margin-top: 60px">
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
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import Header from "iview/src/components/layout/header";

    export default {
        data() {
            return {
                SearchValue: ''
            };
            components: {
                Header
            }
        }
    }
</script>
<style scoped>

    .ivu-layout-header {
        background: #fff;
        padding: 0 24px;
        height: 60px;
        line-height: 60px;
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        z-index: 1000;
    }

    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
        border-bottom-width: 3px;
    }

    .menu-logo {
        float: left;
        font-size: 22px;
        margin-right: 60px;
    }

    .menu-logo a img {
        margin-right: 8px;
        vertical-align: middle;
    }

    .menu-search {
        float: left;
        margin-right: 20px;
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

    .ivu-layout-content {
        height: 77vh;
    }
</style>
