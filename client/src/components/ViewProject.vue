<template>
    <Card dis-hover>
        <Row :gutter="8">
            <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <base-card
                    id-name="1"
                    :end-val="10"
                    iconType="android-person-add"
                    color="#2d8cf0"
                    intro-text="今日新增问题"></base-card>
            </iCol>
            <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <base-card
                    id-name="2"
                    :end-val="10"
                    iconType="ios-eye"
                    color="#64d572"
                    :iconSize="50"
                    intro-text="今日解决问题"></base-card>
            </iCol>
            <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <base-card id-name="3"
                           :end-val="1000"
                           iconType="upload"
                           color="#ffd572"
                           intro-text="项目总问题数"></base-card>
            </iCol>
            <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <base-card id-name="4"
                           :end-val="100"
                           iconType="shuffle"
                           color="#f25e43"
                           intro-text="总解决数"></base-card>
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
        }
    }
</script>

<style scoped>

</style>
