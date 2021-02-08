<template>
    <div class="x-collapse-item-wrapper" :class="{active: active}">
        <h4 class="x-collapse-item-title" @click="click">
            <x-icon name="right" class="x-collapse-item-arrow"></x-icon>
            {{title}}
        </h4>
        <div class="x-collapse-item-content" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "x-collapse-item",
        props: {
            title: String,
            tag: String
        },
        data() {
            return {
                active: false,
                height: 0
            }
        },
        watch: {
          // 监听active变化
          active(val) {
              if (val) {
                  this.$refs.content.style.height = `${this.height}px`;
              } else {
                  this.$refs.content.style.height = '0px';
              }
          }
        },
        methods: {
            click() {
                // 触发父组件事件 （难想...）
                this.$parent.collapseItemToggle && this.$parent.collapseItemToggle(this);
            }
        },
        mounted() {
            this.height = this.$refs.content.clientHeight;
            this.$refs.content.style.height = '0px';
        }
    };
</script>

<style scoped lang="scss">
    .x-collapse-item-wrapper {

        /* 第一行的title没有上边框，但是有上圆角 */
        &:first-child {
            .x-collapse-item-title {
                border-top-width: 0;
                border-top-right-radius: var(--border-radius);
                border-top-left-radius: var(--border-radius);
            }
        }

        /* 最后一行的title有下圆角*/
        &:last-child {
            .x-collapse-item-title {
                border-bottom-right-radius: var(--border-radius);
                border-bottom-left-radius: var(--border-radius);
            }
        }

        &.active {
            .x-collapse-item-title {
                border-bottom-color: #dcdee2;

                .x-collapse-item-arrow {
                    transform: translateY(-50%) rotate(90deg);
                }
            }

            &:last-child {
                .x-collapse-item-title {
                    border-radius: 0;
                }

                .x-collapse-item-content {
                    border-bottom-right-radius: var(--border-radius);
                    border-bottom-left-radius: var(--border-radius);
                }
            }
        }

        .x-collapse-item-title {
            padding: 5px;
            padding-left: 30px;
            position: relative;
            border: 0 solid #dcdee2;
            border-top-width: 1px;
            border-bottom-width: 1px;
            border-bottom-color: transparent;
            transition: all 0.3s ease-in-out;

            /* 箭头 */
            .x-collapse-item-arrow {
                width: 12px;
                height: 12px;
                position: absolute;
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
                transition: transform 0.3s ease-in-out;
            }
        }

        .x-collapse-item-content {
            transition: height 0.3s ease-in-out;
            overflow: hidden;
            background-color: #ffffff;
        }
    }
</style>
