<template>
    <div class="x-tabs-item-wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-tabs-item",
        props: {
            label: [Number, String]
        }
    };
</script>

<style scoped lang="scss">
    .x-tabs-item-wrapper {
        width: 100%;
        height: 100%;
    }
</style>
