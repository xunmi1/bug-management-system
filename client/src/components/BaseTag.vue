<template>
    <div>
        <Tag v-for="(item, index) in count" :key="index" :name="index" type="dot"
             :closable="count.length===1? false: true"
             :color="item.isChecked===true? 'blue': 'default'" @on-close="tagClose">
            {{ item.name }}
        </Tag>
    </div>
</template>

<script>
    export default {
        name: "BaseTag",
        data() {
            return {
                count: [
                    {
                        name: '我的项目',
                        isChecked: false
                    },
                    {
                        name: '我的项目1',
                        isChecked: false
                    },
                    {
                        name: '我的项目2',
                        isChecked: true
                    }
                ]
            }
        },
        methods: {
            tagAdd: function (text) {
                this.count.push(text);
            },
            // event: 触发事件类型, name: 元素的 name 值
            tagClose(event, name) {
                if (this.count.length > 1) {
                    if (this.count[name].isChecked) {
                        this.count[name - 1].isChecked = true;
                    }
                    this.count.splice(name, 1);
                }
            }
        }
    }
</script>

<style scoped>

</style>
