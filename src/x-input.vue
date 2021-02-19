<template>
    <div class="x-input-wrapper" :class="{error}">
        <input type="text"
               :value="value"
               :disabled="disabled"
               :readonly="readonly"
               :placeholder="placeholder"
               @focus="$emit('focus', $event.target.value)"
               @blur="$emit('blur', $event.target.value)"
               @input="$emit('input', $event.target.value)"
               @change="$emit('change', $event.target.value)"/>

        <template v-if="error">
            <XIcon name="error" class="error-icon"></XIcon>
            <span class="error-mesg">{{message}}</span>
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
            placeholder: String,
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

    /*hover状态*/
    $border-color-hover: #666;

    /*focus状态*/
    $box-shadow-color-focus: rgba(0,0,0,0.5);

    /*disable状态*/
    $border-color-disabled: #bbb;
    $color-disabled: $border-color-disabled;

    /*error状态*/
    $error-color: #f1453d;
    $border-color-error:  $error-color;

    .x-input-wrapper {
        font-size: $font-size;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;

        > *:not(:last-child) {
            margin-right: .3em;
        }

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

        .error-icon, .error-mesg {
            color: $error-color;
        }
    }
</style>
