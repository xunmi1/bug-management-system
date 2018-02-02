<template>
    <Collapse value="1" style="font-size: 14px">
        <Panel name="1">
            基本信息
            <div slot="content">

            </div>
        </Panel>
        <Panel name="2">
            个性展示
            <div slot="content">

            </div>
        </Panel>
        <Panel name="3">
            消息订阅
            <div slot="content">

            </div>
        </Panel>
    </Collapse>
</template>

<script>
    export default {
        name: "theUserInfo",
        data () {
            return {
            }
        }
    }
</script>

<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
