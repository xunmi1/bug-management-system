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
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "BaseTag",
        data() {
            return {}
        },
        methods: {
            ...mapMutations({
                add: 'tagAdd',
                close: 'tagClose',
                change: 'tagChange'
            }),
            tagAdd(name, url) {
                this.add({
                    name,
                    url
                });
                this.tagRedirect(this.list[index].url);
            },

            /**
             * tag 标签关闭
             * @param event - 触发事件类型
             * @param index - 元素的 name 值
             */
            tagClose(event, index) {
                this.close({index});
                if (this.isRedirect) {
                    index = this.tagIndex;
                    this.tagRedirect(this.list[index].url);
                }
            },

            /**
             * tag 标签切换
             * @param checked - 组件自带的 prop
             * @param index - 元素的 name 值
             */
            tagChange(checked, index) {
                if (this.isRedirect) {
                    this.change({index});
                    this.tagRedirect(this.list[index].url);
                }
            },

            /**
             * 切换当前显示页面
             * @param url tag 标签的 url
             */
            tagRedirect(url) {
                this.$router.push({path: url});
            }
        },
        computed: {
            ...mapState({
                list: state => state.tagState.list,
                tagIndex: state => state.tagState.tagIndex,
                isRedirect: state => state.tagState.isRedirect
            })
        },
    }
</script>

<style scoped>

</style>
