<template>
    <Card dis-hover>
        <Row :gutter="10">
            <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                <base-card
                    id-name="addToday"
                    :end-val="issueCount.addToday"
                    iconType="ios-plus-outline"
                    color="#f25e43"
                    :iconSize="42"
                    intro-text="今日新增问题"></base-card>
            </iCol>
            <iCol :xs="24" :sm="12" :md="6" class="margin-bottom">
                <base-card
                    id-name="finishToady"
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
</template>

<script>
    import BaseCard from './base/BaseCard';

    export default {
        name: "ViewProject",
        components: {
            BaseCard
        },
        data() {
            return {
                issueCount: {
                    addToday: 10,
                    finishToady: 16,
                    addAll: 1200,
                    finishAll: 900
                }
            }
        }
    }
</script>

<style scoped>
    .margin-bottom {
        margin-bottom: 10px;
    }
</style>
