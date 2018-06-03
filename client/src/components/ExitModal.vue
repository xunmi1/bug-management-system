<template>
    <Modal v-model="modalStatus"
           :closable="false"
           :mask-closable="false"
           width="380">
        <div slot="header" class="header-font">
            <i class="fa fa-exclamation-circle fa-lg fa-fw" style="color: #f90"></i>
            <span>退出系统</span>
        </div>
        <p style="text-align:center; font-size: 15px">你确定要退出系统吗？</p>
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
                this.$store.dispatch('exitUser').then((res) => {
                    console.log(res);
                    if (res.status) {
                        this.$cookie.delete('userToken');
                        setTimeout(() => {
                            this.$emit('on-close');
                            this.$store.commit('setPermission', '000000');
                            this.$router.push({name: 'home'});
                        }, 600);
                    } else {
                        this.$Message.error('退出系统失败！');
                    }
                });

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
