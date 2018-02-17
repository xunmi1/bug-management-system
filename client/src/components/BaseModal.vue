<template>
    <div>
        <Modal v-model="modal.exit" width="380" :mask-closable=false :loading=true @on-ok="exit">
            <p slot="header" class="header-font">
                <i class="fa fa-exclamation-circle fa-lg fa-fw" style="color: #f90"></i>
                <span>退出系统</span>
            </p>
            <p style="text-align:center; font-size: 15px">你确定要退出系统吗？</p>
        </Modal>
        <Modal v-model="modal.issue" width="660" :styles="{top: '30px'}"
               :mask-closable=false @on-ok="issue" @on-cancel="clearInfo">
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
                        <component :is="contentView" ref="component">
                        </component>
                    </keep-alive>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import theIssueInfo from './TheIssueInfo';
    import theIssuePlan from './TheIssuePlan';

    export default {
        name: "BaseModal",
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
                    this.$router.push({path: '/'});
                }, 1000);
            },
            issue() {
                this.$refs.component.submit();
            },
            clearInfo() {
                
            },
            // 点击 issue 中切换按钮，切换表单
            changeBtn(bool) {
                this.btnStyle = bool;
                this.contentView = this.btnStyle ? theIssueInfo : theIssuePlan;
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
