<template>
    <div class="x-popover-wrapper" ref="popover-wrapper" @click="click">
        <div ref="popover"
             class="x-popover"
             :style="{display: visible? 'block': 'none', ...position}">
            <slot name="content"></slot>

            <div class="x-popover-arrow" :class="{[`x-popover-arrow-${arrowLayout}`]: !!arrowLayout}"></div>
        </div>
        <slot></slot>
        <div class="test1"></div>
    </div>
</template>

<script>
    export default {
        name: "x-popover",
        data() {
            return {
                visible: false,
                position: {},
                contentRef: null,
                arrowLayout: ''
            }
        },
        mounted() {
        },
        methods: {
            click(ev) {
                this.visible = !this.visible;

                if (this.visible) {
                    let rect = ev.currentTarget.getBoundingClientRect();

                    console.log(rect);
                    let verticalMiddle = rect.top + rect.height / 2;

                    let documentHeight = document.documentElement.clientHeight;

                    let position = {
                        left: 0
                    };

                    if (verticalMiddle >= documentHeight / 2) {
                        console.log('放上');
                        position.bottom = `${documentHeight - rect.top + 15}px`;
                        this.arrowLayout = 'bottom';
                    } else {
                        console.log('放下');
                        position.top = `${rect.bottom + 15}px`;
                        this.arrowLayout = 'top-center';
                    }

                    this.setContentPosition(position);
                } else {
                    this.clearContentPosition();
                }

                this.addContent();
            },
            // 添加content
            addContent() {
                if (!this.contentRef) {
                    this.contentRef = this.$refs['popover'];
                    document.documentElement.appendChild(this.contentRef);
                }
            },
            setContentPosition(position) {
                if (position) {
                    this.position = {
                        position: 'fixed',
                        ...position
                    }
                } else {
                    this.position = {};
                }
            },
            clearContentPosition() {
                this.setContentPosition(null);
            }
        }
    };
</script>

<style scoped lang="scss">
    .test1 {
        position: fixed;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: red;
    }

    .x-popover-wrapper {
        display: inline-block;
        vertical-align: middle;
    }

    .x-popover {
        width: 200px;

        border: 1px solid;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: #ffffff;

        $arrow-l: 10px;

        .x-popover-arrow {
            width: $arrow-l;
            height: $arrow-l;
            position: absolute;
            transform: rotate(45deg);
            background-color: #ffffff;
            border: 1px solid;

            &::after {
                width: $arrow-l;
                height: $arrow-l;
                content: '';
                background-color: #ffffff;
                position: absolute;
            }
        }


        [class^='x-popover-arrow-top'] {
            bottom: calc(100% - 4px);

            &::after {
                top: 0;
                left: 0;
            }
        }

        .x-popover-arrow-top-center {
            left: calc((100% - #{$arrow-l}) / 2);
        }
        .x-popover-arrow-top-left {
            left: 30%;
        }

        .x-popover-arrow-top-right {
            right: 30%;
        }

        [class^='x-popover-arrow-bottom'] {
            top: calc(100% - 4px);

            &::after {
                top: -2px;
                left: -2px;
            }
        }

        /*.x-popover-arrow-left {
            bottom: calc(100% - 4px);

            &::after {
                top: 0;
                left: 0;
            }
        }

        .x-popover-arrow-right {
            bottom: calc(100% - 4px);

            &::after {
                top: 0;
                left: 0;
            }
        }*/

    }
</style>
