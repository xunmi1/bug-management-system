<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <slot name="header">
            <div class="header">
                <Icon type="cube fa-fw" style="color: #2d8cf0"></Icon>
                功能模块
            </div>
        </slot>
        <Tree :data="moduleList" :render="renderTree" class="tree"></Tree>
        <div class="content-button">
            <ButtonGroup size="large">
                <Button @click="handleReset('moduleList')">取消</Button>
                <Button type="primary" @click="handleSubmit('moduleList')">确定</Button>
            </ButtonGroup>
        </div>
        <Modal v-model="modal" width="360">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>模块添加</span>
            </p>
            <div style="text-align:center">
                <Input v-model="title" placeholder="输入模块名称" style="width: 300px"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="setTitle">添加</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "ProjectModules",
        props: {
            isBordered: {type: Boolean, default: true},
            data: {type: Array}
        },
        data() {
            return {
                moduleList: [],
                modal: false,
                itemData: '',
                title: '',
                poptip: {
                    trigger: 'hover',
                    placement: 'right-end'
                }
            }
        },
        methods: {
            // 初始化用户数据
            initData() {
                if (!this.data) {
                    if (this.defaultIndex >= 0) {
                        this.moduleList = JSON.parse(JSON.stringify(this.projectList[this.defaultIndex].moduleList));
                    } else {
                        this.$router.push({name: 'myProject'});
                        this.$root.Bus.$emit('closeComponent', 'ProjectModules');
                        this.$Notice.warning({
                            title: '没有项目可打开！',
                            desc: '请设置你的默认项目，或者创建新项目。'
                        });
                    }
                } else {
                    this.moduleList = this.data;
                }
            },
            renderTree(h, {root, node, data}) {
                return h('div', {
                        style: {
                            display: 'inline-block',
                            paddingBottom: '4px',
                            width: '100%',
                            fontSize: '15px'
                        }
                    },
                    [
                        h('i', {
                            class: `fa fa-fw ${data.children ? 'fa-folder' : 'fa-file'}`
                        }),
                        h('Poptip', {
                            props: Object.assign({}, this.poptip),
                            style: {cursor: 'pointer'}
                        }, [
                            h('span', data.title),
                            h('ButtonGroup', {slot: 'content'}, [
                                h('Button', {
                                    props: Object.assign({}, {type: 'primary'}),
                                    on: {
                                        click: () => {
                                            this.append(data)
                                        }
                                    }
                                }, [
                                    h('i', {class: 'fa fa-plus fa-fw'}),
                                    h('span', '添加')
                                ]),
                                h('Button', {
                                    props: Object.assign({type: 'ghost'}),
                                    on: {
                                        click: () => {
                                            this.remove(root, node, data)
                                        }
                                    }
                                }, [
                                    h('i', {class: 'fa fa-trash-o fa-fw'}),
                                    h('span', '删除')
                                ])
                            ])

                        ])
                    ]
                )
            },
            setTitle() {
                const children = this.itemData.children || [];
                children.push({title: this.title});
                this.$set(this.itemData, 'children', children);
                this.modal = false;
            },
            // 模块添加
            append(data) {
                this.itemData = data;
                this.title = '';
                this.modal = true;
            },
            // 模块删除
            remove(root, node, data) {
                try {
                    // find() 深度遍历，parentKey 为当前节点的父节点的索引值
                    const parentKey = root.find(el => el === node).parent;
                    const parent = root.find(el => el.nodeKey === parentKey).node;
                    const index = parent.children.indexOf(data);
                    parent.children.splice(index, 1);
                }
                catch (e) {
                    this.$Message.error('禁止删除！');
                }
            },
            handleSubmit(name) {
                if (!this.data) {
                    this.$store.commit('setProjectModuleList', this.moduleList);
                    this.$Message.success('修改成功！');
                } else {
                    this.$emit('update:data', this[name]);
                    this.$emit('on-ok');
                }
            },
            handleReset(name) {
                this.initData();
            }
        },
        computed: {
            ...mapState({
                defaultIndex: state => state.project.defaultIndex,
                projectList: state => state.project.projectList
            }),
        },
        mounted() {
            this.initData();
        }
    }
</script>

<style scoped>
    .padding {
        padding: 30px 24px;
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

    .header {
        position: relative;
        font-size: 15px;
        border-bottom: 1px solid #e9eaec;
        top: -14px;
        padding-bottom: 16px;
        line-height: 1;
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

    .tree {
        padding-left: 24px;
        border: #ccc dashed 1px;
    }
</style>
