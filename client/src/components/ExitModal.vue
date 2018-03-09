<template>
    <Modal v-model="modalStatus" width="380" :mask-closable=false>
        <div slot="header" class="header-font">
            <i class="fa fa-exclamation-circle fa-lg fa-fw" style="color: #f90"></i>
            <span>退出系统</span>
        </div>
        <div slot="close"></div>
        <p style="text-align:center; font-size: 15px">
            你确定要退出系统吗？
        </p>
        <div slot="footer">
            <Button type="text" size="large" @click="closeModal">取消</Button>
            <Button type="primary" size="large" @click="exit">确定</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "ExitModal",
        props: {
            'modal-status': {
                type: Boolean,
                default: false
            }
        },
        methods: {
            exit() {
                // 这里添加清除登录状态
                setTimeout(() => {
                    this.$emit('on-close');
                    this.$router.push({name: 'home'});
                }, 600);
            },
            closeModal() {
                this.$emit('on-close');
            }
        }
    }
</script>

<style scoped>
    .header-font {
        font-weight: normal;
        font-size: 15px;
    }
</style>
