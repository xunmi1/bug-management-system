<template>
    <Card>
        <Tabs value="1" type="card">
            <TabPane label="解决人员分配" name="1">
                <Table highlight-row
                       stripe></Table>
            </TabPane>
            <TabPane label="测试人员分配" name="2">
                <Table highlight-row
                       stripe></Table>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    export default {
        name: "SetDispense"
    }
</script>

<style scoped>

</style>
