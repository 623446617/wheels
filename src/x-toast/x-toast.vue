<template>
    <transition name="fade">
        <div v-if="display" class="x-toast" :class="toastCls">
            <p v-if="enableHtml" class="x-toast-message" v-html="text"></p>
            <p v-else class="x-toast-message">{{text}}</p>
            <span v-if="canClose" class="x-toast-close" @click="hide">{{closeText}}</span>
        </div>
    </transition>
</template>

<script>
    const positions = ['top', 'center', 'bottom']
    export default {
        name: "x-toast",
        data() {
            return {
                text: '',           // 文字
                closeText: '关闭',      // 关闭按钮文字
                callback: null,     // 关闭回调
                enableHtml: false,  // 是否显示html
                position: positions[1], // 位置
                /*内部*/
                timer: 0,           // 定时器
                canClose: false,    // 是否显示按钮
                display: false      // 显示toast
            }
        },
        computed: {
            toastCls() {
                return {
                    'x-toast-canClose': this.canClose,
                    [`x-toast-${this.position}`]: true
                }
            }
        },
        methods: {
            init() {
                this.text = '';
                this.closeText = '关闭';
                this.callback = null;
                this.enableHtml = false;
                this.position = positions[1];
                this.timer = 0;
                this.canClose = false;
                this.display = false;
            },
            show(param, delay = 0) {
                this.init();
                this.initToast(param);

                if (delay !== 0) {
                    // 自动关闭
                    this.autoClose(delay);
                } else {
                    // 手动关闭
                    this.canClose = true;
                }
            },
            initToast(param) {
                this.display = true;

                if (typeof param === 'string') {
                    this.text = param;
                } else {
                    const {text, closeText = '关闭', position = positions[1], enableHtml, onClosed} = param;
                    this.text = text;
                    this.closeText = closeText;
                    this.callback = onClosed;
                    this.enableHtml = enableHtml;
                    this.position = this.setPosition(position);
                }
            },
            autoClose(delay) {
                window.clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    window.clearTimeout(this.timer);
                    this.hide();
                }, delay);
            },
            hide() {
                this.display = false;
                this.callback && this.callback();
            },
            setPosition(p) {
                if (!positions.includes(p)) {
                    throw new Error('');
                }

                return p;
            }
        }
    };
</script>

<style scoped lang="scss">

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .x-toast {
        position: fixed;
        background-color: rgba(0, 0, 0, .7);
        padding: 5px 10px;
        border-radius: 3px;
        color: #ffffff;
        display: flex;
        z-index: 99;

        &.x-toast-center {
            top: 50%;
            left: 50%;
            transform: translate(-50%);
        }

        &.x-toast-top {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        &.x-toast-bottom {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }


        .x-toast-message {
            width: max-content;
            max-width: 150px;
            word-break: break-all;
        }

        &.x-toast-canClose {

            .x-toast-message,
            .x-toast-close {
                padding: 0 10px;
                display: inline-block;
                vertical-align: middle;
            }

            .x-toast-message {
                padding-left: 0;
            }

            .x-toast-close {
                padding-right: 0;
                border-left: 1px solid white;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                white-space: nowrap;
            }
        }


    }
</style>
