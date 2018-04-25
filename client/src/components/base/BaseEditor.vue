<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor';

    export default {
        name: 'BaseEditor',
        props: {
            content: String
        },
        data() {
            return {
                editor: {},
                editorContent: ''
            }
        },
        methods: {
            // 查看代码
            getContent() {
                alert(this.editorContent);
            },
            clearContent() {
                this.editor.txt.clear();
            }
        },
        mounted() {
            let editor = new E(this.$refs.editor);
            editor.customConfig.onchange = (html) => {
                this.editorContent = html;
                this.$emit('get-content', html);
            };
            editor.create();
            editor.txt.html(this.content);
            this.editor = editor;
        }
    }
</script>

<style scoped>
</style>
