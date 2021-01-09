<template>
    <div class="x-row" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
    import {childValidatorMixin} from "./mixins";

    export default {
        name: "x-row",
        mixins: [childValidatorMixin],
        props: {
            gutter: {
                type: [Number, String]
            }
        },
        computed: {
          rowStyle() {
              let {gutter} = this;
              return gutter && `margin-right: -${gutter / 2}px; margin-left: -${gutter / 2}px;`;
          }
        },
        mounted() {
            this.validator('x-col');
            this.setChildGutter();
        },
        methods: {
            // 给子组件x-col设置gutter属性
            setChildGutter() {
                if (this.gutter) {
                    this.$children.forEach(vm => {
                        vm.gutter = this.gutter;
                    });
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-row {
        display: flex;
        /*换行*/
        flex-wrap: wrap;
    }
</style>
