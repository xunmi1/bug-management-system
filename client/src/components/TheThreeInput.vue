<template>
    <div class="container">
        <form class="form">
            <input v-model="InputAttribute.input1.value" v-bind="InputAttribute.input1"/>
            <input v-model="InputAttribute.input2.value" v-bind="InputAttribute.input2"/>
            <input v-model="InputAttribute.input3.value" v-bind="InputAttribute.input3"/>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'TheThreeInput',
        props: ['InputAttribute'],
        data() {
            return {
                InputAttribute: this.InputAttribute
            };
        },
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

        border: 1px solid rgba(0, 0, 0, 0.4);
        background-color: rgba(255, 255, 255, 0.45);
        height: 46px;
        width: 254px;
        border-radius: 6px;
        padding: 0 14px;
        margin: 0 auto 10px auto;
        display: block;
        text-align: center;
        font-size: 18px;
        color: #495060;
        transition-duration: 0.25s;
    }

    form input:hover {
        background-color: white;
        width: 290px;
        color: #1c2438;
        font-size: 20px;
    }
</style>
