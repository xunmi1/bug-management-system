<template>
    <div>
        <Modal v-model="modal.exit" width="380" :mask-closable="false" :loading=true @on-ok="exit()">
            <p slot="header" class="header-font">
                <i class="fa fa-exclamation-circle fa-lg fa-fw" style="color: #f90"></i>
                <span>退出系统</span>
            </p>
            <p style="text-align:center; font-size: 15px">你确定要退出系统吗？</p>
        </Modal>
        <Modal v-model="modal.issue" width="580" :mask-closable="false" :loading=true @on-ok="issue()">
            <p slot="header" class="header-font">
                <Icon type="ios-compose" class="fa fa-lg fa-fw"></Icon>
                <span>问题提交</span>
            </p>
            <div>
                <ButtonGroup class="issue-btn-group">
                    <Button :type="btnStyle? 'info':'default' " class="issue-btn">问题信息</Button>
                    <Button :type="btnStyle? 'default': 'info'" class="issue-btn">计划安排</Button>
                </ButtonGroup>
                <div class="content">
                    <keep-alive>
                        <component :is="contentView">
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
        border: 1px solid #e9eaec;
        font-size: 14px;
    }
</style>
