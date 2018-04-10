<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor';

    export default {
        name: 'BaseEditor',
        data() {
            return {
                editorContent: ''
            }
        },
        methods: {
            // 查看代码
            getContent: function () {
                alert(this.editorContent);
            }
        },
        mounted() {
            let editor = new E(this.$refs.editor);
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            };
            editor.create();
        }
    }
</script>

<style scoped>
</style>
