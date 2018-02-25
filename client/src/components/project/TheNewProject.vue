<template>
    <div style="background-color: #fff">
        <Card>
            <Steps :current="current">
                <Step title="信息" content="填写项目基本信息"></Step>
                <Step title="成员" content="项目的人员管理"></Step>
                <Step title="模块" content="项目包含的基本功能和模块"></Step>
                <Step title="版本" content="项目的迭代和版本信息"></Step>
            </Steps>
        </Card>
        <Card>
            <Carousel id="123" v-model="current" dots="none">
                <CarouselItem>
                    <project-info isBordered=""></project-info>
                </CarouselItem>
                <CarouselItem>
                    <project-people isBordered=""></project-people>
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
    import ProjectPeople from '@/project/ProjectPeople';

    export default {
        name: "TheNewProject",
        data() {
            return {
                current: 0
            }
        },
        components: {
            'project-info': ProjectInfo,
            'project-people': ProjectPeople
        },
        methods: {
            nextStep() {
                if (this.current < 3) {
                    this.current++;
                } else {
                    this.$Notice.success({
                        title: '项目新建成功！'
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
