<template>
    <div class="x-input-wrapper" :class="{error}">
        <input type="text"
               :value="value"
               :disabled="disabled"
               :readonly="readonly"/>

        <template v-if="error" style="display: flex; justify-content: center; align-items: center;">
            <XIcon name="setting"></XIcon>
            <span>{{message}}</span>
        </template>
    </div>
</template>

<script>
    import XIcon from './x-icon';
    export default {
        name: "x-input",
        props: {
            value: {
                type: String | Number
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            error: {
                type: Boolean,
                default: false
            },
            message: {
                type: String
            }
        },
        components: {
            XIcon
        }
    };
</script>

<style scoped lang="scss">
    $height: 32px;
    $border-color: #999;
    $border-radius: 4px;
    $font-size: 14px;

    $border-color-hover: #666;

    $box-shadow-color-focus: rgba(0,0,0,0.5);

    $border-color-disabled: #bbb;
    $color-disabled: $border-color-disabled;

    $border-color-error:  #f1453d;

    .x-input-wrapper {
        font-size: $font-size;
        display: inline-block;
        vertical-align: middle;

        > input {
            height: $height;
            border: 1px solid $border-color;
            border-radius: $border-radius;
            padding: 0 8px;
            font-size: inherit;

            &:hover {
                border-color: $border-color-hover;
            }

            &:focus {
                box-shadow: inset 0 1px 3px $box-shadow-color-focus;
                outline: none;
            }

            &[disabled] {
                border-color: $border-color-disabled;
                color: $color-disabled;
                cursor: not-allowed;
            }
        }

        &.error {
            > input {
                border-color: $border-color-error;
            }
        }
    }
</style>
