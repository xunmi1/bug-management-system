<template>
    <div class="index-container">
        <the-background/>
        <div class="container-header">
            <h1>{{ title }}</h1>
            <div class="header-content">
                <div class="item">
                    <i class="fa fa-github fa-lg fa-fw"></i>
                </div>
                <div class="item">
                    <a :href="githubUrl">github</a>
                </div>
            </div>
        </div>
        <div class="container-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import TheBackground from './TheBackground';

    export default {
        name: 'TheIndex',
        data() {
            return {
                title: '软件 BUG 跟踪管理系统',
                githubUrl: 'https://github.com/xunmi1/bug-management-system'
            };
        },
        components: {
            'the-background': TheBackground
        }
    }
</script>

<style scoped>
    * {
        text-align: center;
        font-weight: normal;
    }

    .container-header h1 {
        padding-top: 80px;
        margin-bottom: 16px;
        font-size: 32px;
    }

    .header-content {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item {
        font-size: 26px;
    }
</style>
