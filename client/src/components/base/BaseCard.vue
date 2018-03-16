<template>
    <Card :padding="0">
        <div class="base-card-con">
            <iCol class="base-card-icon-con"
                  :style="{backgroundColor: color, color: '#fff'}"
                  span="8">
                <Row type="flex"
                     justify="center"
                     align="middle"
                     class="card-height">
                    <Icon :type="iconType" :size="iconSize"></Icon>
                </Row>
            </iCol>
            <iCol span="16" class="card-height">
                <Row type="flex"
                     justify="center"
                     align="middle"
                     class="card-height">
                    <count-up :id-name="idName"
                              :end-val="endVal"
                              :color="color"
                              :countSize="countSize"
                              :countWeight="countWeight"
                              class="base-card-count">
                        <p class="base-intro-text" slot="intro">
                            {{ introText }}
                        </p>
                    </count-up>
                </Row>
            </iCol>
        </div>
    </Card>
</template>

<script>
    import CountUp from './CountUp';

    export default {
        name: 'BaseCard',
        components: {
            CountUp
        },
        props: {
            idName: String,
            endVal: Number,
            color: String,
            iconType: String,
            introText: String,
            countSize: {
                type: String,
                default: '36px'
            },
            countWeight: {
                type: Number,
                default: 500
            },
            iconSize: {
                type: Number,
                default: 38
            }
        }
    };
</script>

<style scoped>
    .card-height {
        height: 100%;
    }

    .base-card-con {
        height: 96px;
    }

    .base-intro-text {
        font-size: 14px;
        font-weight: 500;
        color: #a8a8a8;
    }

    .base-card-icon-con {
        height: 100%;
        color: #fff;
        border-radius: 3px 0 0 3px;
    }
</style>
