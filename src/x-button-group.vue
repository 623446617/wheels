<template>
    <div class="x-button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-button-group",
        mounted() {
            this.validator('x-button');
        },
        methods: {
            // 规定传入子组件类型
            validator(cptname) {
                this.$children.forEach((child, i) => {
                    if (child.$options.name !== cptname) {
                        throw new Error(`<${this.$options.name}/> 传入的第${i + 1}个子组件不为 <${cptname}/>`);
                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-button-group {
        display: inline-flex;
        vertical-align: middle;

        > .x-button {
            border-radius: 0;

            &:not(:first-child) {
                margin-left: -1px;
            }

            &:first-child {
                border-top-left-radius: var(--border-radius);
                border-bottom-left-radius: var(--border-radius);
            }

            &:last-child {
                border-top-right-radius: var(--border-radius);
                border-bottom-right-radius: var(--border-radius);
            }

            &:hover {
                position: relative;
                z-index: 1;
            }
        }
    }
</style>
