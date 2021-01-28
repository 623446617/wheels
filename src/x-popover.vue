<template>
    <div class="x-popover-wrapper" ref="wrapper">
        <div ref="popover"
             @click.stop
             class="x-popover"
             :class="layout"
             :style="{display: visible? 'block': 'none', ...position}">
            <slot name="content"></slot>

            <div class="x-popover-arrow" :class="{[`x-popover-arrow-${arrowLayout}`]: !!arrowLayout}"></div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-popover",
        data() {
            return {
                visible: false,
                position: {},
                popoverRef: null,
                arrowLayout: ''
            }
        },
        props: {
            trigger: {
                type: String,
                default: 'click',
                validator(val) {
                    let bool = ['click', 'hover'].indexOf(val) !== -1;

                    if (!bool) {
                        throw new Error(`props 'trigger' is not included in ['click', 'hover'].`);
                    }

                    return bool;
                }
            },
            layout: {
                type: String,
                default: 'vertical',
                validator(val) {
                    let bool = ['vertical', 'horizontal'].indexOf(val) !== -1;

                    if (!bool) {
                        throw new Error(`props 'layout' is not included in ['vertical', 'horizontal'].`);
                    }

                    return bool;
                }
            }
        },
        created() {
            this.$XWHEELEVENTBUS.$on('XWHEELPOPOVERDISMISS', (target) => {
                if (target !== this) {
                    this.visible = false;
                }
            });
        },
        mounted() {
            this.addListener();
            this.bindEvents();
        },
        destroyed() {
            this.removeListener();
        },
        methods: {
            bindEvents() {
              if (this.trigger === 'click') {
                  this.$refs.wrapper.addEventListener('click', this.click);
              } else if (this.trigger === 'hover') {
                  this.$refs.wrapper.addEventListener('mouseenter', this.showPopover);
                  this.$refs.wrapper.addEventListener('mouseleave', this.hidePopover);
              }
            },
            addListener() {
                // 根据window滚动事件计算popover位置
                document.addEventListener('scroll', this.popoverInWindowPosition);
                window.addEventListener('resize', this.popoverInWindowPosition);
            },

            removeListener() {
                // 移出document上的监听
                document.removeEventListener('scroll', this.popoverInWindowPosition);
                window.removeEventListener('resize', this.popoverInWindowPosition);
                document.removeEventListener('click', this.documentEventHandler);
            },

            showPopover() {
                this.visible = true;

                // 显示当前的popover，隐藏其他的popover
                this.$XWHEELEVENTBUS.$emit('XWHEELPOPOVERDISMISS', this);

                // popover添加到body
                this.addPopoverToBody();

                this.$nextTick(() => {
                    document.addEventListener('click', this.documentEventHandler);
                    this.popoverInWindowPosition();
                });
            },
            hidePopover() {
                this.visible = false;
                document.removeEventListener('click', this.documentEventHandler);
                this.clearPopoverPosition();
            },

            click(e) {
                e.stopPropagation();
                if (!this.visible) {
                    this.showPopover();
                } else {
                    this.hidePopover();
                }
            },

            // 将popover添加到body上
            addPopoverToBody() {
                if (!this.popoverRef) {
                    this.popoverRef = this.$refs['popover'];
                    document.documentElement.appendChild(this.popoverRef);
                }
            },

            // 点击document时，隐藏popover
            documentEventHandler() {
                this.visible = false;
                document.removeEventListener('click', this.documentEventHandler);
                console.log('documentEventHandler');
            },

            // 竖直方向位置
            verticalPosition(wrapperRect, popover, documentHeight, documentWidth, margin = 15) {
                let position = {};
                let arrowLayout = '';

                // 点击元素的（竖直）中间位置
                let middle = wrapperRect.top + wrapperRect.height / 2;

                /*
                *
                * 判断popover位置与箭头朝向
                *
                * */
                // 点击元素在屏幕上半区
                if (middle >= documentHeight / 2) {
                    // popover在上，arrow朝下
                    position.bottom = `${documentHeight - wrapperRect.top + margin}px`;
                    arrowLayout = 'bottom';
                }
                // 点击元素在屏幕下半区
                else {
                    // popover在下，arrow朝上
                    position.top = `${wrapperRect.bottom + margin}px`;
                    arrowLayout = 'top';
                }

                const width = popover.clientWidth;

                // 箭头居左、中、右
                if (wrapperRect.left < width) {
                    position.left = `${wrapperRect.left}px`;
                    arrowLayout += '-left';
                } else if (documentWidth - wrapperRect.right < width) {
                    position.right = `${documentWidth - wrapperRect.right}px`;
                    arrowLayout += '-right';
                } else {
                    arrowLayout += '-center';
                    position.left = `${wrapperRect.left + wrapperRect.width / 2 - width / 2}px`;
                }

                return {position, arrowLayout};
            },

            // 水平方向位置
            horizontalPosition(wrapperRect, popover, documentHeight, documentWidth, margin = 15) {
                let position = {};
                let arrowLayout = '';

                // 点击元素的（水平）中间位置
                let center = wrapperRect.left + wrapperRect.width / 2;

                /*
                *
                * 判断popover位置与箭头朝向
                *
                * */
                // 点击元素在屏幕右半区
                if (center >= documentWidth / 2) {
                    // popover在左，arrow朝右
                    position.right = `${documentWidth - wrapperRect.left + margin}px`;
                    arrowLayout = 'right';
                }
                // 点击元素在屏幕左半区
                else {
                    // popover在右，arrow朝左
                    position.left = `${wrapperRect.right + margin}px`;
                    arrowLayout = 'left';
                }

                // 箭头居上、中、下
                if (wrapperRect.top <= popover.clientHeight / 2) {
                    position.top = `${wrapperRect.top}px`;
                    arrowLayout += '-top';
                } else if ((documentHeight - wrapperRect.bottom) <= popover.clientHeight / 2) {
                    position.bottom = `${documentHeight - wrapperRect.bottom}px`;
                    arrowLayout += '-bottom';
                } else {
                    position.top = `${wrapperRect.top + wrapperRect.height / 2 - popover.clientHeight / 2}px`;
                    arrowLayout += '-middle';
                }

                return {position, arrowLayout};
            },

            // 计算popover在窗口的位置
            popoverInWindowPosition() {
                // 获取当前点击元素位置信息
                const wrapperRect = this.$refs['wrapper'].getBoundingClientRect();
                const popover = this.$refs['popover'];

                // 获取窗体宽高
                const documentHeight = document.documentElement.clientHeight,
                    documentWidth = document.documentElement.clientWidth;

                // 获取箭头位置与popover位置
                const {arrowLayout, position} = this[`${this.layout}Position`](wrapperRect, popover, documentHeight, documentWidth);

                this.arrowLayout = arrowLayout;
                this.setPopoverPosition(position);
            },
            setPopoverPosition(position) {
                if (position) {
                    this.position = {
                        position: 'fixed',
                        ...position
                    }
                } else {
                    this.position = {};
                }
            },
            clearPopoverPosition() {
                this.setPopoverPosition(null);
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-popover-wrapper {
        display: inline-block;
        vertical-align: middle;
    }

    $border-color: rgba(0, 0, 0, .2);
    .x-popover {
        color: var(--color);
        font-size: var(--font-size);
        max-width: 200px;
        min-width: 50px;
        word-break: break-all;

        border-radius: 5px;
        padding: 5px 10px;
        background-color: #ffffff;
        box-shadow: 0 1px 6px $border-color;

        $arrow-l: 10px;

        .x-popover-arrow {
            width: $arrow-l;
            height: $arrow-l;
            position: absolute;
            transform: rotate(45deg);
            background-color: #ffffff;
            border: 1px solid hsla(0, 0%, 85%, .5);

            &::after {
                width: $arrow-l;
                height: $arrow-l;
                content: '';
                background-color: #ffffff;
                position: absolute;
            }
        }

        /* 竖直 */
        &.vertical {
            .x-popover-arrow-top-center,
            .x-popover-arrow-top-left,
            .x-popover-arrow-top-right {
                bottom: calc(100% - 4px);

                &::after {
                    top: 0;
                    left: 0;
                }
            }

            .x-popover-arrow-bottom-center,
            .x-popover-arrow-bottom-left,
            .x-popover-arrow-bottom-right {
                top: calc(100% - 4px);

                &::after {
                    top: -2px;
                    left: -2px;
                }
            }

            .x-popover-arrow-top-center,
            .x-popover-arrow-bottom-center {
                left: calc((100% - #{$arrow-l}) / 2);
            }

            .x-popover-arrow-top-left,
            .x-popover-arrow-bottom-left {
                left: 10%;
            }

            .x-popover-arrow-top-right,
            .x-popover-arrow-bottom-right {
                right: 10%;
            }
        }

        /* 水平 */
        &.horizontal {
            .x-popover-arrow-left-top,
            .x-popover-arrow-left-middle,
            .x-popover-arrow-left-bottom {
                right: calc(100% - 4px);

                &::after {
                    top: -2px;
                    left: 0;
                }
            }

            .x-popover-arrow-right-top,
            .x-popover-arrow-right-middle,
            .x-popover-arrow-right-bottom {
                left: calc(100% - 4px);

                &::after {
                    top: 0;
                    left: -2px;
                }
            }

            .x-popover-arrow-left-top,
            .x-popover-arrow-right-top {
                top: 5%;
            }

            .x-popover-arrow-left-bottom,
            .x-popover-arrow-right-bottom {
                bottom: 5%;
            }

            .x-popover-arrow-left-middle,
            .x-popover-arrow-right-middle {
                top: calc((100% - #{$arrow-l}) / 2);
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
