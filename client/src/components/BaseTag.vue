<template>
    <div>
        <Tag v-for="(item, index) in count" :key="item" :name="index"
             closable type="dot" color="blue" @on-close="tagClose">
            {{ item }}
        </Tag>
    </div>
</template>

<script>
    export default {
        name: "BaseTag",
        data() {
            return {
                count: ['项目1', '项目2']
            }
        },
        methods: {
            tagAdd(text) {
                this.count.push(text);
            },
            // event: 触发事件类型, name: 元素的 name 值
            tagClose(event, name) {
                this.count.splice(name, 1);
            }
        }
    }
</script>

<style scoped>

</style>
