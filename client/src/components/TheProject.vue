<template>
    <Collapse value="1" style="font-size: 14px">
        <Panel name="1">
            拥有的项目
            <div slot="content">
                <Card class="card" @click.native="newProject('newProject')">
                    <p slot="title">新建项目</p>
                    <Icon type="plus-round" class="plus-round"></Icon>
                </Card>
                <Card class="card" v-for="project in ownerList" :key="project.info.id">
                    <p slot="title">{{project.info.title}}</p>
                    <p>{{project.info.desc}}</p>
                </Card>
            </div>
        </Panel>
        <Panel name="2">
            参与的项目
            <div slot="content">
                <Card class="card" v-for="project in partakeList" :key="project.info.id">
                    <p slot="title">{{project.info.title}}</p>
                    <p>{{project.info.desc}}</p>
                </Card>
            </div>
        </Panel>
        <Panel name="3">
            已关闭项目
            <div slot="content">
                <Card class="card" v-for="project in closedList" :key="project.info.id">
                    <p slot="title">{{project.info.title}}</p>
                    <p>{{project.info.desc}}</p>
                </Card>
            </div>
        </Panel>
        <Panel name="4">
            删除的项目
            <div slot="content">
                <Card class="card" v-for="project in deleteList" :key="project.info.id">
                    <p slot="title">{{project.info.title}}</p>
                    <p>{{project.info.desc}}</p>
                </Card>
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
                        title: this.menuItem[tag].title,
                        name: this.menuItem[tag].name
                    });
                    this.$router.push({name: tag});
                }
            }
        },
        computed: {
            ...mapState({
                menuItem: state => state.tagState.menuList,
                projectList: state => state.project.projectList
            }),
            ownerList() {
                return this.projectList.filter(project => project.status === 0);
            },
            partakeList() {
                return this.projectList.filter(project => project.status === 1);
            },
            closedList() {
                return this.projectList.filter(project => project.status === 2);
            },
            deleteList() {
                return this.projectList.filter(project => project.status === 3);
            }
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
