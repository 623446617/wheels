<template>
    <div class="x-popover-wrapper" ref="popover-wrapper" @click.stop="click">
        <div ref="popover"
             @click.stop
             class="x-popover"
             :style="{display: visible? 'block': 'none', ...position}">
            <slot name="content"></slot>

            <div class="x-popover-arrow" :class="{[`x-popover-arrow-${arrowLayout}`]: !!arrowLayout}"></div>
        </div>
        <slot></slot>
        <div class="test1"></div>
        <div class="test2"></div>
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
        },
        destroyed() {
            this.removeListener();
        },
        methods: {
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
            click() {
                // 显示当前的popover，隐藏其他的popover
                this.$XWHEELEVENTBUS.$emit('XWHEELPOPOVERDISMISS', this);

                // popover添加到body
                this.addPopoverToBody();

                this.visible = !this.visible;

                if (this.visible) {
                    this.$nextTick(() => {
                        document.addEventListener('click', this.documentEventHandler);
                        this.popoverInWindowPosition();
                    });
                } else {
                    document.removeEventListener('click', this.documentEventHandler);
                    this.clearPopoverPosition();
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
            // 计算popover在窗口的位置
            popoverInWindowPosition() {
                // 获取当前点击元素位置信息
                let rect = this.$refs['popover-wrapper'].getBoundingClientRect();

                console.log(rect);
                let verticalMiddle = rect.top + rect.height / 2;

                let documentHeight = document.documentElement.clientHeight,
                    documentWidth = document.documentElement.clientWidth;

                let position = {};
                let arrowLayout = '';

                // 判断popover上下位置与箭头位置
                if (verticalMiddle >= documentHeight / 2) {
                    console.log('popover在上');
                    position.bottom = `${documentHeight - rect.top + 15}px`;

                    console.log('arrow朝下');
                    arrowLayout = 'bottom';
                } else {
                    console.log('popover在下');
                    position.top = `${rect.bottom + 15}px`;
                    console.log('arrow朝上');
                    arrowLayout = 'top';
                }

                const popover = this.$refs['popover'];
                const width = popover.clientWidth;
                console.log(width)

                // 箭头居左、中、右
                if (rect.left < width) {
                    position.left = `${rect.left}px`;
                    arrowLayout += '-left';
                } else if (documentWidth - rect.right < width) {
                    position.right = `${documentWidth - rect.right}px`;
                    arrowLayout += '-right';
                } else {
                    arrowLayout += '-center';
                    position.left = `${rect.left + rect.width / 2 - width / 2}px`;
                }

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
    .test1 {
        position: fixed;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: red;
    }
    .test2 {
        position: fixed;
        top: 0;
        left: 50%;
        width: 1px;
        height: 100%;
        background-color: red;
    }

    .x-popover-wrapper {
        display: inline-block;
        vertical-align: middle;
    }

    .x-popover {
        max-width: 200px;
        min-width: 50px;
        word-break: break-all;

        border: 1px solid;
        border-radius: 5px;
        padding: 5px 10px;
        background-color: #ffffff;
        box-shadow: 0 2px 5px 0 rgba(black, 0.1);

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
        .x-popover-arrow-top-center {
            left: calc((100% - #{$arrow-l}) / 2);
        }

        .x-popover-arrow-bottom-left,
        .x-popover-arrow-top-left {
            left: 10%;
        }

        .x-popover-arrow-bottom-right,
        .x-popover-arrow-top-right {
            right: 10%;
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
