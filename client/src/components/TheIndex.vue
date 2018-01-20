<template>
    <div class="index-container">
        <div class="container-header">
            <h1>{{ title }}</h1>
            <div class="header-content">
                <div class="item1">
                    <img src="../assets/images/github.png" alt="github" height="30" width="30"/>
                </div>
                <div class="item2">
                    <h2>
                        <a v-bind:href="githuburl">github</a>
                    </h2>
                </div>

            </div>
        </div>
        <div class="container-content">
            <!--
        <h2>Essential Links</h2>
        <ul>
            <li>
                <a
                    href="https://vuejs.org"
                    target="_blank"
                >
                    Core Docs
                </a>
            </li>
            <li>
                <a
                    href="https://forum.vuejs.org"
                    target="_blank"
                >
                    Forum
                </a>
            </li>
            <li>
                <a
                    href="https://chat.vuejs.org"
                    target="_blank"
                >
                    Community Chat
                </a>
            </li>
            <li>
                <a
                    href="https://twitter.com/vuejs"
                    target="_blank"
                >
                    Twitter
                </a>
            </li>
            <br />
            <li>
                <a
                    href="http://vuejs-templates.github.io/webpack/"
                    target="_blank"
                >
                    Docs for This Template
                </a>
            </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li>
                <a
                    href="http://router.vuejs.org/"
                    target="_blank"
                >
                    vue-router
                </a>
            </li>
            <li>
                <a
                    href="http://vuex.vuejs.org/"
                    target="_blank"
                >
                    vuex
                </a>
            </li>
            <li>
                <a
                    href="http://vue-loader.vuejs.org/"
                    target="_blank"
                >
                    vue-loader
                </a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/awesome-vue"
                    target="_blank"
                >
                    awesome-vue
                </a>
            </li>
        </ul>
        -->
        </div>

    </div>
</template>

<script>
    export default {
        name: 'TheIndex',
        data() {
            return {
                title: '软件 BUG 跟踪管理系统',
                githuburl: 'https://github.com/xunmi1/bug-management-system'
            };
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        color: #42b983;
    }

    h1, h2 {
        font-weight: normal;
    }
    .container-header h1 {
        margin-bottom: 12px;
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

    /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
    /*}*/

    /*li {*/
    /*display: inline-block;*/
    /*margin: 0 10px;*/
    /*}*/


</style>
