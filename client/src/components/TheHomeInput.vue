<template>
    <div class="container">
        <form class="form">
            <input v-model="HomeInput.input1.value" v-bind="HomeInput.input1"/>
            <input v-model="HomeInput.input2.value" v-bind="HomeInput.input2"/>
            <input v-model="HomeInput.input3.value" v-bind="HomeInput.input3"/>
        </form>
    </div>
</template>

<script>
    const HomeInput = {
        input1: {
            type: 'button',
            value: '进入',
        },
        input2: {
            type: 'button',
            value: '登录',
        },
        input3: {
            type: 'button',
            value: '注册',
        }
    };
    export default {
        name: 'TheHomeInput',
        //props: ['InputAttribute'],
        data() {
            return { HomeInput };
        }
    }
</script>

<style scoped src="../assets/stylesheets/theinput.css"></style>
