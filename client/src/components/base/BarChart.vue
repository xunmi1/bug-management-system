<template>
    <div style="width:100%;height:280%;" class="column"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: "BarChart",
        props: {
            barNumber: Number,
            xData: Array,
            yData: Array
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
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    grid: {
                        top: '24%',
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
                            data: this.yData,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
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
    .column {
        width: 100%;
        height: 200%;
    }
</style>
