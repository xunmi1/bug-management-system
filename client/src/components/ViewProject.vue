<template>
    <div>
        <Card dis-hover>
            <p slot="title" class="card-title">问题概况</p>
            <Row :gutter="16">
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="addToday"
                               :end-val="issueCount.addToday"
                               iconType="ios-plus-outline"
                               color="#f25e43"
                               :iconSize="42"
                               intro-text="今日新增问题"></base-card>
                </iCol>
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="finishToady"
                               :end-val="issueCount.finishToady"
                               iconType="ios-checkmark-outline"
                               color="#2d8cf0"
                               :iconSize="42"
                               intro-text="今日解决问题"></base-card>
                </iCol>
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="addAll"
                               :end-val="issueCount.addAll"
                               iconType="bug"
                               color="#ffd572"
                               :iconSize="42"
                               intro-text="项目总问题数"></base-card>
                </iCol>
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="finishAll"
                               :end-val="issueCount.finishAll"
                               iconType="android-done-all"
                               color="#64d572"
                               :iconSize="42"
                               intro-text="项目总解决数"></base-card>
                </iCol>
            </Row>
        </Card>
        <Card dis-hover>
            <p slot="title" class="card-title">你的贡献</p>
            <Row :gutter="16">
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="issue"
                               :end-val="userCount.issue"
                               iconType="ios-plus-outline"
                               color="#f25e43"
                               :iconSize="42"
                               intro-text="总提交数"></base-card>
                </iCol>
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="dispense"
                               :end-val="userCount.dispense"
                               iconType="ios-color-filter-outline"
                               color="#ffd572"
                               :iconSize="42"
                               intro-text="总分配数"></base-card>
                </iCol>
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="solve"
                               :end-val="userCount.solve"
                               iconType="android-checkmark-circle"
                               color="#2d8cf0"
                               :iconSize="42"
                               intro-text="总解决数"></base-card>
                </iCol>
                <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                    <base-card id-name="test"
                               :end-val="userCount.test"
                               iconType="clipboard"
                               color="#64d572"
                               :iconSize="42"
                               intro-text="总测试数"></base-card>
                </iCol>
            </Row>
        </Card>
        <Card :padding="0" :bordered="false" dis-hover>
            <Row :gutter="0">
                <iCol :xs="24" :sm="24" :md="12" class="margin-bottom">
                    <Card dis-hover>
                        <p slot="title" class="card-title">近7天问题数</p>
                        <bar-chart :bar-number="0"
                                   :x-data="dateList"
                                   :y-data="issueWeek"></bar-chart>
                    </Card>
                </iCol>
                <iCol :xs="24" :sm="24" :md="12" class="margin-bottom">
                    <Card dis-hover>
                        <p slot="title" class="card-title">近7天解决数</p>
                        <bar-chart :bar-number="1"
                                   :x-data="dateList"
                                   :y-data="solveWeek"></bar-chart>
                    </Card>
                </iCol>
            </Row>
        </Card>

    </div>
</template>

<script>
    import BaseCard from './base/BaseCard';
    import BarChart from './base/BarChart';

    export default {
        name: "ViewProject",
        components: {
            BaseCard,
            BarChart
        },
        data() {
            return {
                issueCount: {
                    addToday: 10,
                    finishToady: 16,
                    addAll: 1200,
                    finishAll: 900
                },
                userCount: {
                    issue: 10,
                    dispense: 6,
                    solve: 0,
                    test: 0
                },
                dateList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                issueWeek: [26, 10, 10, 59, 33, 70, 30],
                solveWeek: [59, 33, 10, 70, 30, 26, 10]
            }
        }
    }
</script>

<style scoped>
    .card-title {
        font-size: 14px;
        font-weight: 500;
    }

    .margin-bottom {
        margin-bottom: 10px;
    }
</style>
