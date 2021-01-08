<template>
    <div class="x-col"
         :class="[span && `x-col-${span}`, offset && `x-offset-${offset}`]"
         :style="gutter && `padding-right: ${gutter / 2}px; padding-left: ${gutter / 2}px;`">
        <div style="border: 1px solid;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "x-col",
        data() {
            return {
                // 偏移
                gutter: 0
            }
        },
        props: {
            // 份数
            span: {
                type: [Number, String]
            },
            // 偏移
            offset: {
                type: [Number, String]
            },
        }
    };
</script>

<style scoped lang="scss">
    .x-col {
        min-height: 5px;
        /*宽度为 100%，d:f 默认不换行，则默认均等分x-row*/
        width: 100%;

        $start: 1;
        $end: 24;

        $span: x-col-;
        @for $n from $start through $end {
            &.#{$span}#{$n} {
                width: ($n / 24) * 100%;
            }
        }

        $offset: x-offset-;
        @for $n from $start through $end {
            &.#{$offset}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
</style>
