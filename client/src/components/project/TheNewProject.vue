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
                    <project-modules :isBordered=false :data.sync="newProject.modules"
                                     @on-ok="nextStep">
                        <div slot="header"></div>
                    </project-modules>
                </CarouselItem>
                <CarouselItem>
                    <project-versions :isBordered=false :data.sync="newProject.versionList"
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
                    people: {
                        allList: [],           // 项目成员
                        ownerList: [],         // 管理人员
                        issuerList: [],        // 提交人员
                        developerList: [],     // 解决人员
                        dispenseList: [],      // 分配人员
                        testerList: []         // 测试人员
                    },
                    modules: [],
                    versionList: [],
                    issueList: [],
                    status: 0
                },
                current: 0,
                maxCurrent: 0
            }
        },
        components: {
            ProjectVersions,
            'project-info': ProjectInfo,
            'project-people': ProjectPeople,
            'project-modules': ProjectModules,
            'project-versions': ProjectVersions
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
                    if (this.maxCurrent < this.current) {
                        this.maxCurrent = this.current;
                    }
                } else {
                    this.$store.commit('pushProject', this.newProject);
                    this.$Notice.success({
                        title: '新项目添加成功！',
                        desc: '切勿重复点击确认按钮！'
                    });
                }
            }
        },
        created() {
            let owner = this.$store.state.user.userInfo;
            owner = {
                userId: owner.userId, name: owner.name, email: owner.email, desc: owner.name, avatarId: owner.avatarId
            };
            this.newProject.people.allList.push(owner);
            this.newProject.people.ownerList.push(owner);
        }
    }
</script>

<style scoped>
    .ivu-steps-item {
        cursor: pointer;
    }
</style>
