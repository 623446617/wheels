<template>
    <div class="x-content">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-content"
    };
</script>

<style scoped lang="scss">
    .x-content {
        flex: 1;
    }
</style>
