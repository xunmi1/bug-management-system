<template>
    <div>
        <Modal v-model="exitStatus" width="380" :mask-closable=false :loading=true @on-ok="exit">
            <p slot="header" class="header-font">
                <i class="fa fa-exclamation-circle fa-lg fa-fw" style="color: #f90"></i>
                <span>退出系统</span>
            </p>
            <p style="text-align:center; font-size: 15px">你确定要退出系统吗？</p>
        </Modal>
        <Modal v-model="issueStatus" width="660" :styles="{top: '30px'}" :mask-closable=false>
            <p slot="header" class="header-font">
                <Icon type="compose" class="fa-lg fa-fw" style="color: #2d8cf0"></Icon>
                <span>问题提交</span>
            </p>
            <div>
                <ButtonGroup class="issue-btn-group">
                    <Button :type="btnStyle? 'info':'default'"
                            class="issue-btn" @click="changeBtn(true)">问题信息
                    </Button>
                    <Button :type="btnStyle? 'default':'info'"
                            class="issue-btn" @click="changeBtn(false)">计划安排
                    </Button>
                </ButtonGroup>
                <div class="content">
                    <keep-alive>
                        <component :is="contentView" ref="component"
                                   @closeIssue="closeModalIssue">
                        </component>
                    </keep-alive>
                </div>
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="resetIssue">清空</Button>
                <Button type="primary" size="large" @click="submitIssue">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import theIssueInfo from './issue/TheIssueInfo';
    import theIssuePlan from './issue/TheIssuePlan';

    export default {
        name: "TheModal",
        props: {
            modal: {
                type: Object,
                default: function () {
                    return {
                        issue: false,
                        exit: false
                    }
                }
            }
        },
        data() {
            return {
                contentView: theIssueInfo,
                btnStyle: true
            }
        },
        methods: {
            exit() {
                // 这里添加清除登录状态
                setTimeout(() => {
                    this.$router.push({name: 'home'});
                }, 1000);
            },
            submitIssue() {
                this.$refs.component.submitIssue();
            },
            resetIssue() {
                this.$refs.component.resetIssue();
            },
            // 点击 issue 中切换按钮，切换表单
            changeBtn(bool) {
                this.btnStyle = bool;
                this.contentView = this.btnStyle ? theIssueInfo : theIssuePlan;
            },
            // 关闭 issue 对话框，由子组件触发事件
            closeModalIssue() {
                this.issueStatus = false;
            }
        },
        computed: {
            exitStatus: {
                get() {
                    return this.modal.exit;
                },
                set(bool) {
                    this.modal.exit = bool;
                }
            },
            issueStatus: {
                get() {
                    return this.modal.issue;
                },
                set(bool) {
                    this.modal.issue = bool;
                }
            }
        }
    }
</script>

<style scoped>
    .header-font {
        font-weight: normal;
        font-size: 16px;
    }

    .issue-btn-group {
        width: 100%;
    }

    .issue-btn {
        width: 50%;
        height: 36px;
        font-size: 14px;
    }

    .content {
        margin-top: 16px;
    }
</style>
