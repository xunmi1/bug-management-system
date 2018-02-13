<template>
    <Form :model="issueInfo" :label-width="70">
        <Row>
            <Col span="18">
            <FormItem label="标题">
                <Input v-model="issueInfo.title" placeholder="问题简述......"></Input>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="类型">
                <Select v-model="issueInfo.select">
                    <Option value="bug">缺陷</Option>
                    <Option value="task">任务</Option>
                    <Option value="require">需求</Option>
                    <Option value="optimize">优化</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
            <FormItem label="所属项目">
                <Select v-model="issueInfo.project">
                    <Option value="project1">未知</Option>
                </Select>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="模块">
                <Select v-model="issueInfo.module">
                    <Option value="module1">未知</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <FormItem label="详细描述">
            <Input v-model="issueInfo.textarea" type="textarea"
                   :autosize="{minRows: 4,maxRows: 10}"></Input>
        </FormItem>
        <FormItem label="附件">
            <Row>
                <Col span="6">
                <Upload multiple action="">
                    <Button type="ghost" icon="ios-cloud-upload-outline">图片上传</Button>
                </Upload>
                </Col>
                <Col span="6">
                <Upload multiple action="">
                    <Button type="ghost" icon="ios-cloud-upload-outline">文本上传</Button>
                </Upload>
                </Col>
                <Col span="6">
                <Upload multiple action="">
                    <Button type="ghost" icon="ios-cloud-upload-outline">其他附件</Button>
                </Upload>
                </Col>
            </Row>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: "theIssueInfo",
        data() {
            return {
                issueInfo: {
                    title: '',
                    select: 'bug',
                    project: '',
                    module: '',
                    textarea: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
