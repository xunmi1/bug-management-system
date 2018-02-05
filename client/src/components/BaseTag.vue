<template>
    <div>
        <Tag type="dot" v-for="(item, index) in list"
             checkable
             :key="index"
             :name="index"
             :closable="list.length===1? false: true"
             :color="item.isChecked===true? 'blue': 'default'"
             @on-close="tagClose"
             @on-change="tagChange">
            {{ item.name }}
        </Tag>
    </div>
</template>

<script>
    export default {
        name: "BaseTag",
        data() {
            return {
                list: [
                    {
                        name: '我的项目',
                        url: '/main/project',
                        isChecked: false
                    },
                    {
                        name: '账号设置',
                        url: '/main/user',
                        isChecked: false
                    },
                    {
                        name: '我的项目',
                        url: '/main/project',
                        isChecked: false
                    },
                ]
            }
        },
        methods: {
            tagAdd(text) {
                // 先将 tag 全部设为 false, 再将添加的设为true
                this.list.forEach(item => {
                    item.isChecked = false;
                });
                const tmpItem = {
                    name: text,
                    isChecked: true
                };
                this.list.push(tmpItem);
                this.tagRedirection(this.list[index].url);
            },
            // event: 触发事件类型, index: 元素的 name 值
            tagClose(event, index) {
                // tag 数量大于 1
                if (this.list.length > 1) {
                    let tmp = index;
                    // 选择的 tag 为选中状态
                    if (this.list[index].isChecked) {
                        /**
                         * 选择的 tag 改为未选择状态
                         * 选择的 tag 是第一个，则将第二个 tag 设为选中状态
                         * 否则，将前一个 tag 设为选中状态
                         */
                        this.list[index].isChecked = false;
                        if (index === 0) {
                            this.list[index + 1].isChecked = true;
                            this.tagRedirection(this.list[index + 1].url);
                        } else {
                            this.list[index - 1].isChecked = true;
                            this.tagRedirection(this.list[index - 1].url);
                        }
                    }
                    this.list.splice(index, 1);
                }
            },
            // checked: 组件自带的 prop，index: 元素的 name 值
            tagChange(checked, index) {
                if (!this.list[index].isChecked) {
                    this.list.forEach(item => {
                        item.isChecked = false;
                    });
                    this.list[index].isChecked = true;
                    this.tagRedirection(this.list[index].url);
                }
            },
            // 组件切换
            tagRedirection(url) {
                this.$router.push({path: url});
            }
        }
    }
</script>

<style scoped>

</style>
