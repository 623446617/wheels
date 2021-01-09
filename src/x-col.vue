<template>
    <div class="x-col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
    const validator = (val) => {
        const {span, offset} = val;
        return (typeof span === 'string' || typeof span === 'number') || typeof offset === 'string' || typeof offset === 'number';
    }

    const getColSpan = (span, pre = '') => {
        return span && `x-col-${pre}${span}`;
    }
    const getColOffset = (offset, pre = '') => {
        return offset && `x-offset-${pre}${offset}`;
    }
    export default {
        name: "x-col",
        props: {
            // 份数
            span: {
                type: [Number, String]
            },
            // 偏移
            offset: {
                type: [Number, String]
            },
            // ipad屏幕
            ipad: {
                type: Object,
                validator
            },
            // 窄电脑屏幕
            smallPc: {
                type: Object,
                validator
            },
            // 正常电脑屏幕
            normalPc: {
                type: Object,
                validator
            },
            // 宽电脑屏幕
            largePc: {
                type: Object,
                validator
            },
        },
        data() {
            return {
                // 偏移
                gutter: 0
            }
        },
        computed: {
            colClass() {
                const {span, offset, ipad, smallPc, normalPc, largePc} = this;

                return [
                    getColSpan(span),
                    getColOffset(offset),
                    ...ipad ? [getColSpan(ipad.span, 'ipad-'), getColOffset(ipad.offset, 'ipad-')] : [],
                    ...smallPc ? [getColSpan(smallPc.span, 'smallPC-'), getColOffset(smallPc.offset, 'smallPC-')] : [],
                    ...normalPc ? [getColSpan(normalPc.span, 'normalPC-'), getColOffset(normalPc.offset, 'normalPC-')] : [],
                    ...largePc ? [getColSpan(largePc.span, 'largePC-'), getColOffset(largePc.offset, 'largePC-')] : []
                ];
            },
            colStyle() {
                return this.gutter ? `padding-right: ${this.gutter / 2}px; padding-left: ${this.gutter / 2}px;` : '';
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-col {
        transition: all 0.5s;
        min-height: 5px;
        /*宽度为 100%，d:f 默认不换行，则默认均等分x-row*/
        width: 100%;

        $start: 1;
        $end: 24;

        /*phone(默认)*/
        $span: x-col-;
        @for $n from $start through $end {
            &.#{$span}#{$n} {
                width: ($n / 24) * 100%;
            }
        }
        /*phone(默认)*/
        $offset: x-offset-;
        @for $n from $start through $end {
            &.#{$offset}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }

        /*ipad*/
        @media (min-width: 577px) {
            $span: x-col-ipad-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-iPad-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }

        /*窄屏PC*/
        @media (min-width: 769px) {
            $span: x-col-smallPC-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-smallPC-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }

        /*正常PC*/
        @media (min-width: 993px) {
            $span: x-col-normalPC-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-normalPC-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }

        /*宽PC*/
        @media (min-width: 1201px) {
            $span: x-col-largePC-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-largePC-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }
    }
</style>
