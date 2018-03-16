<template>
    <div>
        <p :class="className"
           :style="{color: color, fontSize: countSize, fontWeight: countWeight}"
           class="text-align">
            <span v-cloak :id="idName">{{ startVal }}</span>
            <span>{{ unit }}</span>
        </p>
        <slot name="intro"></slot>
    </div>
</template>

<script>
    import CountUp from 'countUp';

    function transformValue(val) {
        let endVal = 0;
        let unit = '';
        if (val < 10000) {
            endVal = val;
        } else if (val >= 10000 && val < 10000000) {
            endVal = parseInt(val / 1000);
            unit = 'K+';
        } else if (val >= 10000000 && val < 10000000000) {
            endVal = parseInt(val / 1000000);
            unit = 'M+';
        } else {
            endVal = parseInt(val / 1000000000);
            unit = 'B+';
        }
        return {
            val: endVal,
            unit: unit
        };
    }

    export default {
        name: 'CountUp',
        props: {
            idName: String,
            className: String,
            startVal: {
                type: Number,
                default: 0
            },
            endVal: {
                type: Number,
                required: true
            },
            decimals: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 2
            },
            delay: {
                type: Number,
                default: 500
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        useEasing: true,
                        useGrouping: true,
                        separator: ',',
                        decimal: '.'
                    };
                }
            },
            color: String,
            countSize: {
                type: String,
                default: '36px'
            },
            countWeight: {
                type: Number,
                default: 500
            },
            introText: [String, Number]
        },
        data() {
            return {
                unit: '',
                demo: {}
            };
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    let res = transformValue(this.endVal);
                    let endVal = res.val;
                    this.unit = res.unit;
                    let demo = new CountUp(this.idName, this.startVal, endVal, this.decimals, this.duration, this.options);
                    this.demo = demo;
                    if (!demo.error) {
                        demo.start();
                    }
                }, this.delay);
            });
        },
        watch: {
            endVal(val) {
                const res = transformValue(val);
                const endVal = res.val;
                this.unit = res.unit;
                this.demo.update(endVal);
            }
        }
    };
</script>

<style scoped>
    .text-align {
        text-align: center;
    }
</style>
