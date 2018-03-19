<template>
    <div style="width:100%;height:200%;" class="column"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: "BarChart",
        props: {
            'bar-number': Number,
            'x-data': Array,
            'y-data': Array
        },
        data() {
            return {
                option: {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: '4%',
                        left: '2%',
                        right: '2%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: this.xData,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [
                        {
                            name: '数量',
                            type: 'bar',
                            barWidth: '66%',
                            data: this.yData
                        }
                    ]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                let column = echarts.init(document.getElementsByClassName('column')[this.barNumber]);
                column.setOption(this.option);
                window.addEventListener('resize', function () {
                    column.resize();
                });
            });
        }
    };
</script>

<style scoped>

</style>
