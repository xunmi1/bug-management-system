<template>
    <Form :model="issuePlan" :label-width="78">
        <Row>
            <iCol span="12">
                <FormItem label="分配人员">
                    <AutoComplete v-model="issuePlan.dispense"
                                  :data="countData.dispenseData"
                                  :disabled="disabledState1"
                                  @on-search="dispenseSearch"
                                  placeholder="分配此问题的人员">
                    </AutoComplete>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="解决人员">
                    <AutoComplete v-model="issuePlan.handle"
                                  :data="countData.handleData"
                                  :disabled="disabledState2"
                                  @on-search="handleSearch"
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
                    <AutoComplete v-model="issuePlan.versionEnd" :data="countData.versionEndData"
                                  @on-search="versionSearch" placeholder="预计解决时的版本">
                    </AutoComplete>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="12">
                <FormItem label="起始日期">
                    <DatePicker v-model="issuePlan.dateState" format="yyyy年 MM月 dd日" style="width: 100%"
                                placeholder="选择日期"></DatePicker>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="截止日期">
                    <DatePicker v-model="issuePlan.dateEnd" format="yyyy年 MM月 dd日" style="width: 100%"
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
                issuePlan: {},
                countData: {},
                disabledState1: false,
                disabledState2: false,
            }
        },
        methods: {
            init() {
                this.issuePlan = this.issue;
                this.countData = this.count
            },
            dispenseSearch(val) {
                if (val) {
                    this.disabledState2 = true;
                } else {
                    this.disabledState2 = false;
                }
                this.countData.dispenseData = !val ? [] : [
                    val,
                    val + '测试'
                ];
            },
            handleSearch(val) {
                if (val) {
                    this.disabledState1 = true;
                } else {
                    this.disabledState1 = false;
                }
                this.countData.handleData = !val ? [] : [
                    val,
                    val + '测试'
                ];
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
            versionSearch(val) {
                this.countData.versionData = !val ? [] : [
                    value,
                    val + '.1'
                ];
            }
        },
        computed: {
            ...mapState({
                issue: state => state.issue.issuePlan,
                count: state => state.project.countData
            })
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>

</style>
