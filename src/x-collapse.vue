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
            },
            value: String | Array
        },
        mounted() {
            this.init();
        },
        methods: {
            // 根据value值初始化展开项
            init() {
                if (!this.value) {
                    return;
                }
                if (this.mode === 'single') {
                    this.$children.forEach(child => {
                        if (child.tag === this.value) {
                            child.active = true;
                        }
                    });
                } else {
                    this.$children.forEach(child => {
                        if (this.value.indexOf(child.tag) !== -1) {
                            child.active = true;
                        }
                    });
                }
            },
            // 子组件点击时触发
            collapseItemToggle(vm) {
                console.log(vm);

                if (this.mode === 'single') {
                    let tag = '';
                    if (vm.active) {

                        // 点击的子组件是展开的，就关闭
                        this.$children
                            .forEach(child => {
                                if (vm.tag === child.tag) {
                                    child.active = false;
                                }
                            });
                    } else {

                        // 点击的子组件是关闭的，则先关闭其他子组件，在展开当前子组件
                        this.$children
                            .forEach(child => {
                                child.active = false;
                                if (vm.tag === child.tag) {
                                    child.active = true;
                                }
                            });
                        // vm.active = true;
                        tag = vm.tag;
                    }
                    this.$emit('update:value', tag);
                } else {
                    if (vm.active) {
                        // 关闭
                        let index = this.value.indexOf(vm.tag);
                        if (index !== -1) {
                            this.$children
                                .forEach(child => {
                                    if (vm.tag === child.tag) {
                                        child.active = false;
                                    }
                                });


                            let newArr = [...this.value];
                            newArr.splice(index, 1);
                            this.$emit('update:value', newArr);
                        }
                    } else {
                        this.$children
                            .forEach(child => {
                                if (vm.tag === child.tag) {
                                    child.active = true;
                                }
                            });
                        // 开启
                        let newArr = [...this.value, ...[vm.tag]];
                        this.$emit('update:value', newArr);
                    }
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
