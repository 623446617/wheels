<template>
    <div class="x-layout" :class="{'x-layout-has-sider': hasSider}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-layout",
        data() {
            return {
                hasSider: false
            }
        },
        mounted() {
            this.hasSiderChild();
        },
        methods: {
            hasSiderChild() {
                this.hasSider = this.$children.some(item => item.$options.name === 'x-sider');
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-layout {
        flex-grow: 1;

        height: 100%;
        display: flex;
        flex-direction: column;

        &.x-layout-has-sider {
            flex-direction: row;
        }
    }
</style>
