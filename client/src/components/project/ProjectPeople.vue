<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <Form ref="projectPeople" :model="projectPeople" :rules="rulePeople">
            <FormItem class="content-info-box">
                <div class="content-button">
                    <ButtonGroup size="large">
                        <Button type="primary" @click="handleSubmit('projectPeople')">确定</Button>
                        <Button @click="handleReset('projectPeople')">取消</Button>
                    </ButtonGroup>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "projectPeople",
        props: {
            isBordered: {
                type: Boolean,
                default: true
            },
            data: {
                type: Object
            }
        },
        data() {
            return {
                projectPeople: {},
                rulePeople: {}
            }
        },
        methods: {
            init() {
                if (!this.data) {
                    const statePeople = this.projectList[this.defaultIndex].people;
                    this.projectPeople = Object.assign({}, statePeople);
                } else {
                    this.projectPeople = Object.assign({}, this.data);
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (!this.data) {
                        if (valid) {
                            this.$store.commit();
                            this.$Message.success('修改成功!');
                        } else {
                            this.$Message.error('修改失败！');
                        }
                    } else {
                        if (valid) {
                            this.$emit('update:data', this.projectPeople);
                            this.$emit('on-ok');
                        }
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            })
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    .padding {
        padding: 24px;
        background-color: #fff;
        border-radius: 4px;
    }

    .bordered {
        border: 1px solid #dddee1;
        position: relative;
        transition: all .2s ease-in-out;
    }

    .bordered:hover {
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        border-color: #eee;
    }

    .content-info-box {
        margin: 0 6px 22px 6px;
    }

    .content-info-box p {
        font-size: 15px;
    }

    .content-button {
        width: 100%;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        text-align: center;
    }

    .content-button button {
        width: 100px;
    }
</style>
