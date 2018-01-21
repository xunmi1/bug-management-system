<template>
    <div class="container">
        <form class="form">
            <input v-bind="InputAttribute.input1"/>
            <input v-bind="InputAttribute.input2"/>
            <input v-bind="InputAttribute.input3"/>
        </form>
    </div>

</template>

<script>
    let InputAttribute = {
        input1: {
            type: "button",
            value: "进入",
            placeholder: "进入"
        },
        input2: {
            type: "button",
            value: "登录",
            placeholder: "登录"
        },
        input3: {
            type: "button",
            value: "注册",
            placeholder: "注册"
        }
    };
    export default {
        name: "TheThreeInput",
        data() {
            return {InputAttribute};
        }
    }
</script>

<style scoped>
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 60px 0 20px 0;
        text-align: center;
    }

    form {
        padding: 20px 0;
        z-index: 1;
    }

    form input {
        appearance: none;
        border: 1px solid rgba(0, 0, 0, 0.4);
        background-color: rgba(255, 255, 255, 0.45);
        height: 46px;
        width: 240px;
        border-radius: 6px;
        padding: 8px 14px;
        margin: 0 auto 10px auto;
        display: block;
        text-align: center;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.8);
        transition-duration: 0.25s;
    }

    form input:hover {
        background-color: white;
        width: 280px;
        color: #2c3e50;
        font-size: 22px;
    }
</style>
