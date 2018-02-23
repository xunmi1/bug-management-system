<template>
    <Collapse value="1" style="font-size: 14px">
        <Panel name="1">
            拥有的项目
            <div slot="content">
                <Card class="card">
                    <p slot="title">新建项目</p>
                    <Icon type="plus-round" class="plus-round" @click.native="newProject('newProject')"></Icon>
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
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "TheProject",
        data() {
            return {}
        },
        methods: {
            ...mapMutations({
                add: 'tagAdd'
            }),
            newProject(tag) {
                if (this.menuItem[tag]) {
                    this.add({
                        tag,
                        name: this.menuItem[tag].name,
                        url: this.menuItem[tag].url
                    });
                    this.$router.push({name: tag});
                }
            }
        },
        computed: {
            ...mapState({
                menuItem: state => state.tagState.menuList
            }),
        }
    }
</script>

<style scoped>
    .card {
        width: 170px;
        height: 170px;
        border: 1px solid #2d8cf0;
        margin: 14px;
        background-color: rgba(220, 220, 220, 0.3);
        float: left;
    }

    .plus-round {
        font-size: 86px;
        width: 100%;
        text-align: center;
    }
</style>
