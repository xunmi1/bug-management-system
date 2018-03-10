<template>
    <Form ref="issuePlan" :model="issuePlan" :label-width="78" :rules="rulePlan">
        <Row>
            <iCol span="12">
                <FormItem label="分配人员" prop="dispense">
                    <AutoComplete v-model="issuePlan.dispense"
                                  transfer
                                  :disabled="disabledState1"
                                  @on-search="dispenseSearch"
                                  placeholder="分配此问题的人员">
                        <Option v-for="item in dispenseData" :value="item.title" :key="item.id">
                            {{ item.title }}
                        </Option>
                    </AutoComplete>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="解决人员" prop="developer">
                    <AutoComplete v-model="issuePlan.developer"
                                  transfer
                                  :disabled="disabledState2"
                                  @on-search="developerSearch"
                                  placeholder="解决此问题的人员">
                        <Option v-for="item in developerData" :value="item.title" :key="item.id">
                            {{ item.title }}
                        </Option>
                    </AutoComplete>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="14">
                <FormItem label="优先级">
                    <Slider v-model="issuePlan.priority"
                            :max="4"
                            :tip-format="tipFormat"
                            show-stops></Slider>
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
                    <DatePicker v-model="issuePlan.startDate"
                                transfer
                                format=" yyyy年 MM月 dd日"
                                style="width: 100%"
                                placeholder="选择日期"></DatePicker>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="截止日期">
                    <DatePicker v-model="issuePlan.endDate"
                                transfer
                                format=" yyyy年 MM月 dd日"
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
        name: "IssuePlan",
        props: {
            'issue-plan': {
                type: Object
            }
        },
        data() {
            const validateDispense = (rule, value, callback) => {
                if (value) {
                    const list = this.dispenseList.map(item => item.title);
                    if (!list.includes(value)) {
                        callback(new Error('该成员不存在！'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            const validateDeveloper = (rule, value, callback) => {
                if (value) {
                    const list = this.developerList.map(item => item.title);
                    if (!list.includes(value)) {
                        callback(new Error('该成员不存在！'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                disabledState1: false,
                disabledState2: false,
                dispenseList: [],
                dispenseData: [],
                developerList: [],
                developerData: [],
                rulePlan: {
                    dispense: [
                        {validator: validateDispense, trigger: 'blur'}
                    ],
                    developer: [
                        {validator: validateDeveloper, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            dispenseSearch(val) {
                if (val) {
                    this.disabledState2 = true;
                    this.dispenseData = this.dispenseList.filter(item => {
                        if (item.title.search(val) >= 0) return true;
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
                    this.developerData = this.developerList.filter(item => {
                        if (item.title.search(val) >= 0) return true;
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
            // 将选择的成员名称转换成 id
            setPeopleId(list, title) {
                if (title) {
                    return this[list].filter(item => item.title === title)[0].id;
                }
                else {
                    return ''
                }
            },
            submitIssue() {
                this.$refs['issuePlan'].validate((valid) => {
                    if (valid) {
                        this.issuePlan.dispense = this.setPeopleId('dispenseList', this.issuePlan.dispense);
                        this.issuePlan.developer = this.setPeopleId('developerList', this.issuePlan.developer);
                        this.$emit('push-issue');
                        this.$emit('close-issue');
                    } else {
                        this.$Message.error('<span style="font-size: 14px">提交失败！</span>');
                    }
                });
            },
            resetIssue() {
                this.$refs['issuePlan'].resetFields();
                this.$emit('close-issue');
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            })
        },
        created() {
            this.dispenseList = this.projectList[this.defaultIndex].people
                .dispenseList.map(item => {
                    return {'title': item.name, 'id': item.userId}
                });
            this.developerList = this.projectList[this.defaultIndex].people
                .developerList.map(item => {
                    return {'title': item.name, 'id': item.userId}
                });
        },
        activated() {
            this.issuePlan.startDate = new Date();
        }
    }
</script>

<style scoped>

</style>
