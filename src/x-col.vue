<template>
    <div class="x-col">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-col",
        props: {
            span: {
                type: Number,
                default: 1
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-col {
        min-height: 5px;

        $prefix: x-col-;
        $start: 1;
        $end: 24;
        @for $n from $start through $end {
            &.#{$prefix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
    }
</style>
