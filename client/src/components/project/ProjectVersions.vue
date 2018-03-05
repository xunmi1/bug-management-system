<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <slot name="header">
            <div class="header">
                <Icon type="pull-request fa-fw" style="color: #2d8cf0"></Icon>
                项目版本
            </div>
            <div class="content-button">
                <ButtonGroup size="large">
                    <Button type="primary" @click="handleSubmit('versionList')">确定</Button>
                    <Button @click="handleReset('versionList')">取消</Button>
                </ButtonGroup>
            </div>
        </slot>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ProjectVersions",
        props: {
            isBordered: {type: Boolean, default: true},
            data: {type: Array}
        },
        data() {
            return {
                versionList: []
            }
        },
        methods: {
            initData() {
                if (!this.data) {
                    this.versionList = [...this.projectList[this.defaultIndex].versionList];
                }
                else this.versionList = this.data;
            },
            handleSubmit(name) {
                if (!this.data) {
                    this.$Message.success('修改成功！');
                } else {
                    this.$emit('update:data', this[name]);
                    this.$emit('on-ok');
                }
            },
            handleReset(name) {
                this.initData();
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            }),
        },
        mounted() {
            this.initData();
        }
    }
</script>

<style scoped>
    .padding {
        padding: 30px 24px;
        background-color: #fff;
        border-radius: 4px;
    }

    .bordered {
        border: 1px solid #dddee1;
        position: relative;
        transition: all .2s ease-in-out;
    }

    .bordered:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        border-color: #eee;
    }

    .header {
        position: relative;
        font-size: 15px;
        border-bottom: 1px solid #e9eaec;
        top: -14px;
        padding-bottom: 16px;
        line-height: 1;
    }

    .content-button {
        width: 100%;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        text-align: center;
    }

    .content-button button {
        width: 100px;
    }
</style>
