<template>
    <div class="x-collapse-wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "x-collapse",
        props: {
            // 单项展开，多项展开
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
        methods: {
            // 子组件点击时触发
            collapseItemToggle(vm) {
                if (this.mode === 'single') {
                    if (vm.active) {

                        // 点击的子组件是展开的，就关闭
                        vm.active = false;
                    } else {

                        // 点击的子组件是关闭的，则先关闭其他子组件，在展开当前子组件
                        this.$children
                            .filter(child => child !== vm)
                            .forEach(child => child.active = false);
                        vm.active = true;
                    }
                } else {
                    vm.active = !vm.active;
                }
            }
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
