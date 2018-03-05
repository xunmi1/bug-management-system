<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <slot name="header">
            <div class="header">
                <Icon type="pull-request fa-fw" style="color: #2d8cf0"></Icon>
                项目版本
            </div>
        </slot>
        <div class="content-layout">
            <div class="content-input">
                <p>新版本号：</p>
                <Input v-model="tmpVersion.name" clearable style="width: 200px"></Input>
                <p>简要描述：</p>
                <Input v-model="tmpVersion.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       style="width: 360px"></Input>
            </div>
            <Timeline pending class="content-line">
                <TimelineItem v-for="version in versionList" :key="version.name">
                    <p class="time-line-title">{{version.name}} 版本</p>
                    <p class="time-line-content">{{version.desc}}</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time-line-title">查看更多</p>
                </TimelineItem>
            </Timeline>
        </div>
        <div class="content-button">
            <ButtonGroup size="large">
                <Button type="primary" @click="handleSubmit('versionList')">确定</Button>
                <Button @click="handleReset('versionList')">取消</Button>
            </ButtonGroup>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ProjectVersions",
        props: {
            isBordered: {type: Boolean, default: true},
            data: {type: Object}
        },
        data() {
            return {
                versionList: [],
                tmpVersion: {name: '', desc: ''}
            }
        },
        methods: {
            initData() {
                if (!this.data) {
                    this.versionList = this.projectList[this.defaultIndex].versionList;
                    if (this.versionList.length > 5) this.versionList = this.versionList.slice(-5);
                    this.versionList = this.versionList.map(version => Object.assign({}, version)).reverse();
                }
                else {
                    this.tmpVersion = this.data;
                }
            },
            handleSubmit(name) {
                if (!this.data) {
                    console.log(this[name]);
                    this.$store.commit('pushProjectVersion', this.tmpVersion);
                    this.versionList.pop();
                    this.versionList.unshift(this.tmpVersion);
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

    .content-layout {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: center;
    }

    .content-input > p {
        font-size: 14px;
        margin-bottom: 6px;
    }

    .content-input > div {
        margin-bottom: 24px;
    }

    .content-line {
        margin-top: 16px;
        align-self: flex-start;
        min-width: 180px;
        max-width: 300px;
    }

    .time-line-title {
        font-size: 14px;
        font-weight: bold;
    }

    .time-line-content {
        padding-left: 24px;
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
