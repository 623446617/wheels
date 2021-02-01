<template>
    <div class="x-collapse-wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-collapse"
    };
</script>

<style scoped lang="scss">
    .x-collapse-wrapper {
        border: 1px solid var(--border-color);
    }
</style>
