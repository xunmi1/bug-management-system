<template>
    <Modal v-model="modal.exit" width="380" :mask-closable="false" :loading=true @on-ok="exit()">
        <p slot="header" style="font-size: 16px">
            <i class="fa fa-exclamation-circle fa-lg fa-fw" style="color: #f90"></i>
            <span>退出系统</span>
        </p>
        <p style="text-align:center; font-size: 15px">你确定要退出系统吗？</p>
    </Modal>
</template>

<script>
    export default {
        name: "BaseModal",
        props: {
            modal: {
                type: Object,
                default: function () {
                    return {
                        exit: false
                    }
                }
            }
        },
        methods: {
            exit() {
                // 这里添加清除登录状态
                setTimeout(() => {
                    this.$router.push({path: '/'});
                }, 1000);
            }
        }
    }
</script>

<style scoped>

</style>
