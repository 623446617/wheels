<template>
    <div class="x-collapse-wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-collapse",
        props: {
            // 单个展开，多个展开
            mode: {
                type: String,
                default: 'single',
                validator(val) {
                    const bool = ['single', 'multiple'].indexOf(val) !== -1;

                    if (!bool) {
                        throw new Error(`props 'type' is not included in ['single', 'multiple'].`)
                    }

                    return bool;
                }
            }
        },
        mounted() {
            this.$XWHEELEVENTBUS.$on('XCOLLAPSEITEM-ACTIVE', (vm) => {
                if (this.mode === 'single') {
                    this.$children.forEach(child => {
                        if (child !== vm) {
                            child.active = false;
                        } else {
                            vm.active = !child.active;
                        }
                    });
                } else if (this.mode === 'multiple') {
                    vm.active = !vm.active;
                }
            });
        }
    };
</script>

<style scoped lang="scss">
    .x-collapse-wrapper {
        border: 1px solid #dcdee2;
        border-radius: var(--border-radius);
        background-color: #f7f7f7;

    }
</style>
