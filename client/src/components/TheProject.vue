<template>
    <Collapse v-model="value1" style="font-size: 14px">
        <Panel name="1">
            拥有的项目
            <div slot="content">
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>
            </div>
        </Panel>
        <Panel name="2">
            参与的项目
            <div slot="content">
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>
            </div>
        </Panel>
        <Panel name="3">
            已关闭项目
            <div slot="content">
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>
            </div>
        </Panel>
        <Panel name="4">
            删除的项目
            <div slot="content">
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>
                <base-card></base-card>。
            </div>
        </Panel>
    </Collapse>
</template>

<script>
    import BaseCard from './BaseCard';
    export default {
        name: "TheProject",
        data() {
            return {
                value1: '1'
            }
        },
        components: {
            BaseCard,
            'base-card': BaseCard
        }
    }
</script>

<style scoped>
</style>
