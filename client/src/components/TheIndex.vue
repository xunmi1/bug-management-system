<template>
    <div class="index-container">
        <the-background />
        <div class="container-header">
            <h1>{{ title }}</h1>
            <div class="header-content">
                <div class="item1">
                    <img src="../assets/images/github.png" alt="github" height="36" width="36"/>
                </div>
                <div class="item2">
                    <h2>
                        <a v-bind:href="githuburl">github</a>
                    </h2>
                </div>
            </div>
        </div>
        <div class="container-content">
            <router-view />
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
                githuburl: 'https://github.com/xunmi1/bug-management-system'
            };
        },
        components: {
            'the-background': TheBackground,
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        text-align: center;
        font-weight: normal;
    }
    h1 {
        font-size: 32px;
    }
    h2 {
        font-size: 26px;
    }
    .container-header h1 {
        padding-top: 80px;
        margin-bottom: 16px;
    }

    .header-content {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-content .item1 {
        margin-right: 16px;
    }
</style>
