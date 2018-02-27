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
        <Card>
            <Carousel id="123" v-model="current" dots="none" arrow="never">
                <CarouselItem>
                    <project-info :isBordered=false :data.sync="newProject.info"
                                  @on-ok="nextStep"></project-info>
                </CarouselItem>
                <CarouselItem>
                    <project-people :isBordered=false :data.sync="newProject.people"
                                    @on-ok="nextStep"></project-people>
                </CarouselItem>
                <CarouselItem>
                    <div>3</div>
                </CarouselItem>
                <CarouselItem>
                    <div>4</div>
                </CarouselItem>
            </Carousel>
        </Card>
    </div>
</template>

<script>
    import ProjectInfo from './ProjectInfo';
    import ProjectPeople from './ProjectPeople';

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
                    modules: {},
                    versionList: [],
                    issueList: []
                },
                current: 0,
                maxCurrent: 0
            }
        },
        components: {
            ProjectInfo,
            'project-info': ProjectInfo,
            'project-people': ProjectPeople
        },
        methods: {
            changeStep(index) {
                if (index <= this.maxCurrent) {
                    this.current = index;
                }
            },
            nextStep() {
                if (this.current < 0) {
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
        }
    }
</script>

<style scoped>
    .ivu-steps-item {
        cursor: pointer;
    }
</style>
