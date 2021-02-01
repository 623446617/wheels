<template>
    <div class="x-collapse-item-wrapper" :class="{active: active}" >
        <h4 class="x-collapse-item-title" @click="click">{{title}}</h4>
        <div class="x-collapse-item-content" ref="cc">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "x-collapse-item",
        props: {
            title: String
        },
        data() {
            return {
                active: false,
                height: 0
            }
        },
        methods: {
            click() {
                this.active = !this.active;
                if (this.active) {
                    this.$refs.cc.style.height = `${this.height}px`;
                } else {
                    this.$refs.cc.style.height = '0px';
                }
            }
        },
        mounted() {
            this.height = this.$refs.cc.clientHeight;
            this.$refs.cc.style.height = '0px';
        }
    };
</script>

<style scoped lang="scss">
    .x-collapse-item-wrapper {
        .x-collapse-item-title {
            background-color: #dcdee2;
        }

        .x-collapse-item-content {
            transition: height 0.5s;
            overflow: hidden;
        }


    }
</style>
