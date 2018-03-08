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
            {{ item.title }}
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

            /**
             * tag 标签关闭
             * @param event - 触发事件类型
             * @param index - 元素的 name 值
             */
            tagClose(event, index) {
                this.close({index});
                console.log('是否跳转：' + this.isRedirect);
                if (this.isRedirect) {
                    index = this.tagIndex;
                    this.tagRedirect(index);
                }
            },

            /**
             * tag 标签切换
             * @param checked - 组件自带的 prop
             * @param index - 元素的 name 值 (list 索引)
             */
            tagChange(checked, index) {
                this.change({index});
                console.log('是否跳转：' + this.isRedirect);
                if (this.isRedirect) {
                    this.tagRedirect(index);
                }
            },

            /**
             * 切换当前显示页面
             * @param url tag 标签的 url
             */
            tagRedirect(index) {
                //this.$router.push({path: this.list[index].url});
                this.$router.push({name: this.list[index].tag});
            }
        },
        computed: {
            ...mapState({
                list: state => state.tagState.list,
                tagIndex: state => state.tagState.tagIndex,
                isRedirect: state => state.tagState.isRedirect
            })
        },
        created() {
            /**
             * 监听来自其他组件的事件
             * closeComponent: 组件关闭自己 (name: 组件名);
             */
            this.$root.Bus.$on('closeComponent', name => {
                let tmpIndex;
                this.list.some((item, index) => {
                    if (item.name === name) {
                        tmpIndex = index;
                        return true;
                    }
                });
                this.tagClose({}, tmpIndex);
            });
        },
        beforeDestroy() {
            // 解除事件绑定
            this.$root.Bus.$off('closeComponent');
        }
    }
</script>

<style scoped>

</style>
