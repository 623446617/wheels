<template>
    <button class="x-button" :class="{[`icon-${iconAlign}`]: true}" @click="$emit('xclick')">
        <x-icon class="icon"
                v-if="icon && !loading"
                :name="icon"></x-icon>
        <x-icon class="icon"
                v-if="loading"
                name="loading"></x-icon>
        <div class="content">
            <slot/>
        </div>

    </button>
</template>

<script>
    export default {
        name: "x-button",
        props: {
            icon: {
                // 图标名称
                type: String,
                default: ''
            },
            loading: {
                // 是否显示loading
                type: Boolean,
                default: false
            },
            iconAlign: {
                // 图标位置
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
        color: var(--color);
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

        > .icon {
            order: 1;
            margin-right: 0.3em;
            margin-left: unset;
        }

        &.icon-right {
            > .content {
                order: 1;
            }

            > .icon {
                order: 2;
                margin-left: 0.3em;
                margin-right: unset;
            }
        }
    }
</style>
