<template>
    <button class="x-button" :class="{[`icon-${iconAlign}`]: true}">
        <svg class="x-icon" v-if="icon">
            <use :xlink:href="`#x-${icon}`"></use>
        </svg>
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>

<script>
    export default {
        name: "x-button",
        props: {
            icon: {
                type: String,
                default: ''
            },
            iconAlign: {
                type: String,
                default: 'left',
                // 属性检查器
                validator(val) {
                    // 规定只允许传left或right，默认return false; 报错
                    return val === 'left' || val === 'right';
                }
            }
        }
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
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;

        &:hover {
            border-color: var(--border-color-hover);
        }

        &:active {
            background-color: var(--button-active-bg);
        }

        &:focus {
            outline: none;
        }

        > .content {
            order: 2;
        }

        > .x-icon {
            order: 1;
            margin-right: 0.3em;
            margin-left: unset;
        }

        &.icon-right {
            > .content {
                order: 1;
            }

            > .x-icon {
                order: 2;
                margin-left: 0.3em;
                margin-right: unset;
            }
        }
    }
</style>
