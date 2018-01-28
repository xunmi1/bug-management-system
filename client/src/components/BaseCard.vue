<template>
    <Card class="card">
        <p slot="title">Borderless card</p>
        <p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>
    </Card>
</template>

<script>
    export default {
        name: "BaseCard"
    }
</script>

<style scoped>
.card{
    width: 180px;
    height: 180px;
    border: 1px solid #2d8cf0;
    margin: 14px;
    background-color: rgba(220, 220, 220, 0.3);
    float: left;
}
</style>
