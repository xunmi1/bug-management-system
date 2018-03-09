<template>
    <Modal v-model="modalStatus" width="660" :styles="{top: '30px'}" :mask-closable=false>
        <div slot="header" class="header-font">
            <Icon type="compose" class="fa-lg fa-fw" style="color: #2d8cf0"></Icon>
            <span>问题提交</span>
        </div>
        <div slot="close"></div>
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
                    <component :is="contentView"
                               ref="component"
                               @close-issue="closeIssue"
                               @change-modal="changeModal">
                    </component>
                </keep-alive>
            </div>
        </div>
        <div slot="footer">
            <Button type="text" size="large" @click="resetIssue">清空</Button>
            <Button type="primary" size="large" @click="submitIssue">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import theIssueInfo from './TheIssueInfo';
    import theIssuePlan from './TheIssuePlan';

    export default {
        name: "IssueModal",
        props: {
            'modal-status': {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                contentView: theIssueInfo,
                btnStyle: true
            }
        },
        methods: {
            submitIssue() {
                this.$refs.component.submitIssue();
            },
            resetIssue() {
                this.$refs.component.resetIssue();
            },
            // 点击 issue 中切换按钮，切换表单
            changeBtn(bool) {
                // 在切换第二页之前，触发第一页（子组件）"确认" 按钮, 验证数据
                if (!bool) {
                    this.$refs.component.submitIssue();
                } else {
                    this.changeModal(bool);
                }
            },
            changeModal(bool) {
                this.btnStyle = bool;
                this.contentView = this.btnStyle ? theIssueInfo : theIssuePlan;
            },
            // 关闭 issue 对话框，由子组件触发事件
            closeIssue() {
                // 由 TheMain 组件响应 on-close，更改 modalStatus 值
                this.$emit('on-close');
                this.btnStyle = true;
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
