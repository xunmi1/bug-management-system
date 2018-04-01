<template>
    <Modal v-model="modalStatus" width="660" :styles="{top: '30px'}" :mask-closable="false">
        <div slot="header" class="header-font">
            <Icon type="compose" class="fa-lg fa-fw icon-color"></Icon>
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
                               :issue-info.sync="issue.issueInfo"
                               :issue-plan.sync="issue.issuePlan"
                               ref="component"
                               @close-issue="closeIssue"
                               @push-issue="pushIssue"
                               @change-modal="changeModal">
                    </component>
                </keep-alive>
            </div>
        </div>
        <div slot="footer">
            <Button type="text" size="large" @click="resetIssue">取消</Button>
            <Button type="primary" size="large" @click="submitIssue">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import {mapState} from 'vuex';
    import IssueInfo from './IssueInfo';
    import IssuePlan from './IssuePlan';

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
                contentView: IssueInfo,     // 视图选择
                btnStyle: true,             // 按钮样式
                issue: {
                    issueInfo: {
                        id: '',
                        title: '',
                        select: 'bug',
                        severity: 2,
                        version: '',
                        project: '',
                        module: '',
                        text: ''
                    },
                    issuePlan: {
                        issuer: '',
                        dispense: '',
                        developer: '',
                        tester: '',
                        priority: 2,
                        versionEnd: '',
                        startDate: '',
                        endDate: ''
                    },
                    // 0: 待分配(解决)，1:待解决，2:待分配(测试)，3: 待测试，4: 完成，5: 已拒绝(关闭)，6：延期中
                    status: 0
                },
                tmpIssue: {}                // 保存空对象，用于初始化
            }
        },
        methods: {
            // 调用子组件 submitIssue 事件
            submitIssue() {
                this.$refs.component.submitIssue();
            },
            // 调用子组件 resetIssue 事件
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
                this.contentView = this.btnStyle ? IssueInfo : IssuePlan;
            },
            // 关闭 issue 对话框，由子组件触发事件
            closeIssue() {
                // 由 TheMain 组件响应 on-close，更改 modalStatus 值
                this.$emit('on-close');
                this.btnStyle = true;
                this.contentView = IssueInfo;
                this.issue = JSON.parse(JSON.stringify(this.tmpIssue));
            },
            pushIssue() {
                // 暂时 id 为八位随机数
                this.issue.issueInfo.id = Math.floor(Math.random() * 90000000 + 10000000)
                    .toString();
                this.issue.issuePlan.issuer = this.userId;
                if (this.issue.issuePlan.developer) {
                    this.issue.status = 1;
                }
                const issueData = Object.assign({}, this.issue.issueInfo, this.issue.issuePlan);
                issueData.status = this.issue.status;
                this.$store.commit('pushIssue', issueData);
                this.$Message.success({
                    content: '<span style="font-size: 14px">提交成功！</span>',
                    duration: 2
                });
            }
        },
        computed: {
            ...mapState({
                userId: state => state.user.userInfo.userId
            })
        },
        mounted() {
            this.tmpIssue = JSON.parse(JSON.stringify(this.issue));
        }
    }
</script>

<style scoped>
    .header-font {
        font-weight: 500;
        font-size: 16px;
    }

    .icon-color {
        color: #2d8cf0;
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
