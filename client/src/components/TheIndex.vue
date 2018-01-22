<template>
    <div class="index-container">
        <the-background></the-background>
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
            <the-three-input v-bind:InputAttribute="types"></the-three-input>
        </div>
    </div>
</template>

<script>
    import TheBackground from './TheBackground';
    import TheThreeInput from './TheThreeInput';
    let InputAttribute = {
        input1: {
            type: 'text',
            value: '进入',
            placeholder: '进入',
            name:''
        },
        input2: {
            type: 'button',
            value: '登录',
            placeholder: '登录',
            name:''
        },
        input3: {
            type: 'button',
            value: '注册',
            placeholder: '注册',
            name:''
        }
    }
    export default {
        name: 'TheIndex',
        data() {
            return {
                types: InputAttribute,
                title: '软件 BUG 跟踪管理系统',
                githuburl: 'https://github.com/xunmi1/bug-management-system'
            };
        },
        components: {
            'the-background': TheBackground,
            'the-three-input': TheThreeInput
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
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
