<template>
    <Form ref="issuePlan" :model="issuePlan" :label-width="78">
        <Row>
            <iCol span="12">
                <FormItem label="分配人员" prop="dispense">
                    <AutoComplete v-model="issuePlan.dispense"
                                  transfer
                                  :data="dispenseData"
                                  :disabled="disabledState1"
                                  @on-search="dispenseSearch"
                                  placeholder="分配此问题的人员">
                    </AutoComplete>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="解决人员">
                    <AutoComplete v-model="issuePlan.developer"
                                  transfer
                                  :data="developerData"
                                  :disabled="disabledState2"
                                  @on-search="developerSearch"
                                  placeholder="解决此问题的人员">
                    </AutoComplete>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="14">
                <FormItem label="优先级">
                    <Slider v-model="issuePlan.priority" :max="4" :tip-format="tipFormat" show-stops></Slider>
                </FormItem>
            </iCol>
            <iCol span="10">
                <FormItem label="版本号">
                    <Input v-model="issuePlan.versionEnd" placeholder="预计解决时的版本"></Input>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="12">
                <FormItem label="起始日期">
                    <DatePicker v-model="issuePlan.dateState"
                                transfer
                                format="yyyy年 MM月 dd日"
                                style="width: 100%"
                                placeholder="选择日期"></DatePicker>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="截止日期">
                    <DatePicker v-model="issuePlan.dateEnd"
                                transfer
                                format="yyyy年 MM月 dd日"
                                style="width: 100%"
                                placeholder="选择日期"></DatePicker>
                </FormItem>
            </iCol>
        </Row>
    </Form>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "theIssuePlan",
        data() {
            return {
                disabledState1: false,
                disabledState2: false,
                dispenseList: [],
                dispenseData: [],
                developerList: [],
                developerData: []
            }
        },
        methods: {
            dispenseSearch(val) {
                if (val) {
                    this.disabledState2 = true;
                    this.dispenseData = this.dispenseList.filter(name => {
                        if (name.search(val) >= 0) return true;
                    })
                        .slice(-5);
                } else {
                    this.disabledState2 = false;
                    this.dispenseData = [];
                }
            },
            developerSearch(val) {
                if (val) {
                    this.disabledState1 = true;
                    this.developerData = this.developerList.filter(name => {
                        if (name.search(val) >= 0) return true;
                    })
                        .slice(-5);
                } else {
                    this.disabledState1 = false;
                    this.developerData = [];
                }
            },
            tipFormat(val) {
                switch (val) {
                    case 0:
                        return '极低';
                    case 1:
                        return '低';
                    case 2:
                        return '中';
                    case 3:
                        return '高';
                    case 4:
                        return '紧急';
                }
            },
            submitIssue() {
                this.$refs['issuePlan'].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        this.$store.commit('setIssuePlan', this.issuePlan);
                        this.$Message.success('提交成功！');
                    } else {
                        this.$Message.error('提交失败！');
                    }
                });
            },
            resetIssue() {
                this.$refs['issuePlan'].resetFields();
            }
        },
        computed: {
            ...mapState({
                issuePlan: state => state.issue.issuePlan,
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            })
        },
        created() {
            this.dispenseList = this.projectList[this.defaultIndex].people
                .dispenseList.map(item => item.name);
            this.developerList = this.projectList[this.defaultIndex].people
                .developerList.map(item => item.name);
        }
    }
</script>

<style scoped>

</style>
