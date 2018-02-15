<template>
    <Form :model="issueInfo" :label-width="74">
        <Row>
            <iCol span="18">
                <FormItem label="标题">
                    <Input v-model="issueInfo.title" placeholder="问题简述......"></Input>
                </FormItem>
            </iCol>
            <iCol span="6">
                <FormItem label="类型">
                    <Select v-model="issueInfo.select">
                        <Option value="bug">缺陷</Option>
                        <Option value="task">任务</Option>
                        <Option value="require">需求</Option>
                        <Option value="optimize">优化</Option>
                    </Select>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="12">
                <FormItem label="所属项目">
                    <Select v-model="issueInfo.project">
                        <Option value="project1">未知</Option>
                    </Select>
                </FormItem>
            </iCol>
            <iCol span="12">
                <FormItem label="模块">
                    <Select v-model="issueInfo.module">
                        <Option value="module1">未知</Option>
                    </Select>
                </FormItem>
            </iCol>
        </Row>
        <Row>
            <iCol span="14">
                <FormItem label="严重程度">
                    <Slider v-model="issueInfo.severity" :max="4" :tip-format="tipFormat" show-stops></Slider>
                </FormItem>
            </iCol>
            <iCol span="10">
                <FormItem label="版本号">
                    <AutoComplete v-model="issueInfo.version" :data="versionData"
                                  @on-search="versionSearch" placeholder="问题所在版本">
                    </AutoComplete>
                </FormItem>
            </iCol>
        </Row>
        <FormItem label="详细描述">
            <Input v-model="issueInfo.textarea" type="textarea"
                   :autosize="{minRows: 4, maxRows: 12}"></Input>
        </FormItem>
        <FormItem label="附件">
            <Row>
                <iCol span="6">
                    <Upload multiple action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">图片上传</Button>
                    </Upload>
                </iCol>
                <iCol span="6">
                    <Upload multiple action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">文本上传</Button>
                    </Upload>
                </iCol>
                <iCol span="6">
                    <Upload multiple action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">其他附件</Button>
                    </Upload>
                </iCol>
            </Row>
        </FormItem>
    </Form>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "theIssueInfo",
        data() {
            return {
                issueInfo: {},
                versionData: []
            }
        },
        methods: {
            init() {
                this.issueInfo = this.issue;
                this.versionData = this.version
            },
            tipFormat(val) {
                switch (val) {
                    case 0:
                        return '极低';
                    case 1:
                        return '低';
                    case 2:
                        return '中';
                    case 3:
                        return '高';
                    case 4:
                        return '极高';
                }
            },
            versionSearch(val) {
                this.versionData = !val ? [] : [
                    value,
                    val + '.1'
                ];
            }
        },
        computed: {
            ...mapState({
                issue: state => state.issue.issueInfo,
                version: state => state.project.countData.versionData
            })
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>

</style>
