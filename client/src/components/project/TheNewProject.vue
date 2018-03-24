<template>
    <div style="background-color: #fff">
        <Card>
            <Steps :current="current">
                <Step title="信息" content="填写项目基本信息" @click.native="changeStep(0)"></Step>
                <Step title="成员" content="项目的人员管理" @click.native="changeStep(1)"></Step>
                <Step title="模块" content="项目包含的基本功能和模块" @click.native="changeStep(2)"></Step>
                <Step title="版本" content="项目的迭代和版本信息" @click.native="changeStep(3)"></Step>
            </Steps>
        </Card>
        <Card :padding="0">
            <Carousel id="123" v-model="current" dots="none" arrow="never">
                <CarouselItem>
                    <project-info :isBordered=false :data.sync="newProject.info"
                                  @on-ok="nextStep">
                        <div slot="header"></div>
                    </project-info>
                </CarouselItem>
                <CarouselItem>
                    <project-people :isBordered=false :data.sync="newProject.people"
                                    @on-ok="nextStep">
                        <div slot="header"></div>
                    </project-people>
                </CarouselItem>
                <CarouselItem>
                    <project-modules :isBordered=false :data.sync="newProject.moduleList"
                                     @on-ok="nextStep">
                        <div slot="header"></div>
                    </project-modules>
                </CarouselItem>
                <CarouselItem>
                    <project-versions :isBordered=false :data.sync="newProject.versionList[0]"
                                      @on-ok="nextStep">
                        <div slot="header"></div>
                    </project-versions>
                </CarouselItem>
            </Carousel>
        </Card>
    </div>
</template>

<script>
    import ProjectInfo from './ProjectInfo';
    import ProjectPeople from './ProjectPeople';
    import ProjectModules from './ProjectModules';
    import ProjectVersions from './ProjectVersions'

    export default {
        name: "TheNewProject",
        data() {
            return {
                newProject: {
                    info: {
                        id: '',
                        title: '',
                        desc: '',
                        imgName: ''
                    },
                    people: [],
                    moduleList: [],
                    versionList: [],
                    issueList: [],
                    status: 0
                },
                current: 0,
                maxCurrent: 0
            }
        },
        components: {
            ProjectInfo,
            ProjectPeople,
            ProjectModules,
            ProjectVersions
        },
        methods: {
            changeStep(index) {
                if (index <= this.maxCurrent) {
                    this.current = index;
                }
            },
            nextStep() {
                if (this.current < 3) {
                    this.current++;
                    if (this.current === 1) {
                        this.initModuleList();
                    }
                    if (this.maxCurrent < this.current) {
                        this.maxCurrent = this.current;
                    }
                } else {
                    this.pushNewProject();
                }
            },
            pushNewProject() {
                // 暂时 id 为八位随机数
                this.newProject.info.id = Math.floor(Math.random() * 90000000 + 10000000)
                    .toString();
                this.$store.commit('pushProject', this.newProject);
                this.$Loading.finish();
                this.$Notice.success({
                    title: '新项目添加成功！',
                    desc: '切勿重复点击确认按钮！'
                });
            },
            initData() {
                let owner = this.$store.state.user.userInfo;
                owner = {
                    userId: owner.userId,
                    name: owner.name,
                    email: owner.email,
                    desc: owner.name,
                    avatarId: owner.avatarId,
                    permission: '110000'
                };
                this.newProject.people.push(owner);
                this.newProject.versionList.push({name: '1.0.0', desc: ''});
            },
            initModuleList() {
                this.newProject.moduleList.splice(0, 1, {
                    title: this.newProject.info.title,
                    expand: true,
                    children: []
                });
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style scoped>
    .ivu-steps-item {
        cursor: pointer;
    }
</style>
