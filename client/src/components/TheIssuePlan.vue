<template>
    <Form :model="issuePlan" :label-width="78">
        <Row>
            <iCol span="12">
                <FormItem label="分配人员">
                    <AutoComplete v-model="issuePlan.dispense"
                                  :data="dispenseData"
                                  :disabled="disabledState1"
                                  @on-search="dispenseSearch"
                                  placeholder="分配此问题的人员">
                    </AutoComplete>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="解决人员">
                    <AutoComplete v-model="issuePlan.handle"
                                  :data="handleData"
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
                    <AutoComplete v-model="issuePlan.versionEnd" :data="versionEndData"
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
    export default {
        name: "theIssuePlan",
        data() {
            return {
                issuePlan: {
                    dispense: '',
                    handle: '',
                    priority: 2,
                    versionEnd: '',
                    dateState: '',
                    dateEnd: ''
                },
                dispenseData: [],
                handleData: [],
                versionEndData: [],
                disabledState1: false,
                disabledState2: false,
            }
        },
        methods: {
            dispenseSearch(val) {
                if (val) {
                    this.disabledState2 = true;
                } else {
                    this.disabledState2 = false;
                }
                this.dispenseData = !val ? [] : [
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
                this.handleData = !val ? [] : [
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
                this.versionData = !val ? [] : [
                    value,
                    val + '.1'
                ];
            }
        }
    }
</script>

<style scoped>

</style>
