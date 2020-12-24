<template>
    <button class="x-button">按钮</button>
</template>

<script>
    export default {
        name: "x-button"
    };
</script>

<style scoped lang="scss">
    .x-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background-color: var(--button-bg);

        &:hover {
            border-color: var(--border-color-hover);
        }

        &:active {
            background-color: var(--button-active-bg);
        }

        &:focus {
            outline: none;
        }
    }
</style>
