<template>
    <div class="padding" :class="{ bordered: isBordered }">
        <Form ref="projectPeople" :model="projectPeople" :rules="rulePeople">

        </Form>
    </div>
</template>

<script>
    export default {
        name: "projectPeople",
        props: {
            isBordered: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                projectPeople: {},
                rulePeople: {}
            }
        },
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

</style>
