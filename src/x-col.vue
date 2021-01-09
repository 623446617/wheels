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
            // 手机屏幕
            phone: {
                type: Object,
                validator
            },
            // ipad屏幕
            ipad: {
                type: Object,
                validator
            },
            // 窄电脑屏幕
            narrowPc: {
                type: Object,
                validator
            },
            // 正常电脑屏幕
            pc: {
                type: Object,
                validator
            },
            // 宽电脑屏幕
            widePc: {
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
                const {span, offset, phone, ipad, narrowPc, pc, widePc} = this;

                return [
                    getColSpan(span),
                    getColOffset(offset),
                    ...phone ? [getColSpan(phone.span, 'phone-'), getColOffset(phone.offset, 'phone-')] : [],
                    ...ipad ? [getColSpan(ipad.span, 'ipad-'), getColOffset(ipad.offset, 'ipad-')] : [],
                    ...narrowPc ? [getColSpan(narrowPc.span, 'narrowPC-'), getColOffset(narrowPc.offset, 'narrowPC-')] : [],
                    ...pc ? [getColSpan(pc.span, 'pc-'), getColOffset(pc.offset, 'pc-')] : [],
                    ...widePc ? [getColSpan(widePc.span, 'widePC-'), getColOffset(widePc.offset, 'widePC-')] : []
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
        width: 50%;

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

        /*phone*/
        @media (max-width: 576px) {
            $span: x-col-phone-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-phone-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }

        /*iPad*/
        @media (min-width: 577px) and (max-width: 768px) {
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
        @media (min-width: 769px) and (max-width: 992px) {
            $span: x-col-narrowPC-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-narrowPC-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }

        /*PC*/
        @media (min-width: 993px) and (max-width: 1200px) {
            $span: x-col-pc-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-pc-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }

        /*宽PC*/
        @media (min-width: 1201px) {
            $span: x-col-widePC-;
            @for $n from $start through $end {
                &.#{$span}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $offset: x-offset-widePC-;
            @for $n from $start through $end {
                &.#{$offset}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }
    }
</style>
