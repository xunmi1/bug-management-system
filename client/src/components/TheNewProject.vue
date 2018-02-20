<template>
    <Card>
        <Steps :current="current">
            <Step title="信息" content="填写项目基本信息"></Step>
            <Step title="成员" content="项目的人员管理"></Step>
            <Step title="模块" content="项目包含的基本功能和模块"></Step>
            <Step title="版本" content="项目的迭代和版本信息"></Step>
        </Steps>
        <Carousel v-model="current" dots="none" arrow="never">
            <CarouselItem>
                <div>1</div>
            </CarouselItem>
            <CarouselItem>
                <div>2</div>
            </CarouselItem>
            <CarouselItem>
                <div>3</div>
            </CarouselItem>
            <CarouselItem>
                <div>4</div>
            </CarouselItem>
        </Carousel>
    </Card>
</template>

<script>
    export default {
        name: "TheNewProject",
        data() {
            return {
                current: 0
            }
        }
    }
</script>

<style scoped>

</style>
