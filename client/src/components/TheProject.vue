<template>
    <Collapse value="1" style="font-size: 14px">
        <Panel name="1">
            拥有的项目
            <div slot="content">
                <Card class="card">
                    <p slot="title">Borderless card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                </Card>
                <Card class="card">
                    <p slot="title">Borderless card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                    <p>Content of card</p>
                </Card>
            </div>
        </Panel>
        <Panel name="2">
            参与的项目
            <div slot="content">

            </div>
        </Panel>
        <Panel name="3">
            已关闭项目
            <div slot="content">

            </div>
        </Panel>
        <Panel name="4">
            删除的项目
            <div slot="content">

            </div>
        </Panel>
    </Collapse>
</template>

<script>
    export default {
        name: "TheProject",
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .card {
        width: 180px;
        height: 180px;
        border: 1px solid #2d8cf0;
        margin: 14px;
        background-color: rgba(220, 220, 220, 0.3);
        float: left;
    }
</style>
