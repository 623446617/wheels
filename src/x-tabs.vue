<template>
    <div class="x-tabs-wrapper">
        <ul class="x-tabs-header">
            <li v-for="(item, i) in items"
                :class="{active: select === i}"
                :key="i" ref="x-tab-item"
                @click="itemClick($event, i)">{{item.label}}</li>
        </ul>
        <div class="x-tabs-line-wrapper">
            <div class="x-tabs-line" :style="{width: `${lineWidth}px`, left: `${lineLeft}px`}"></div>
        </div>

        <div class="x-tabs-content">
            <div class="x-tabs-body" :style="{transform: `translateX(${body.x})`}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "x-tabs",
        data() {
            return {
                items: [],
                lineWidth: 0,
                lineLeft: 0,
                select: 0,
                body: {
                    x: 0
                }
            }
        },
        mounted() {
            console.log(this.$children);
            this.init();
            this.initTabs();
        },
        methods: {
            // 初始数据
            init() {
                this.items = this.$children.map(vm => {
                    return {
                        label: vm.label,
                        el: vm.$el
                    }
                });
            },
            // 初始化标签
            initTabs() {
                this.$nextTick(() => {
                    let li0 = this.$refs['x-tab-item'][0];
                    this.lineWidth = li0.clientWidth;
                });
            },
            // 选择tab
            selectTab(li) {
                this.lineWidth = li.clientWidth;

                let index = this.$refs['x-tab-item'].indexOf(li);
                let w = 0;
                for (let j = 0; j < index; j++) {
                    let tempLi = this.$refs['x-tab-item'][j];
                    w += tempLi.clientWidth;
                }

                this.lineLeft = w;
            },
            // 选择tab内容
            selectTabContent(i) {
                this.body.x = `-${100 * i}%`;

                // 选中则visible，其余为hidden(优化滚动动画效果)
                this.items.forEach((item, index) => {
                    item.el.style.visibility = 'hidden';
                    if (i === index) {
                        item.el.style.visibility = 'visible';
                    }
                });
            },
            itemClick(e, i) {
                if (this.select !== i) {
                    let li = e.currentTarget;
                    this.selectTab(li);
                    this.selectTabContent(i);
                    this.select = i;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "base";
    $animate-time: 0.4s;
    .x-tabs-wrapper {
        .x-tabs-header {
            list-style: none;
            width: 100%;

            &::after {
                content: '';
                display: block;
                clear: both;
            }

            > li {
                float: left;
                padding: 5px 10px;
                cursor: pointer;

                transition: color $animate-time;
                &.active {
                    color: $tab-color;
                }
            }
        }

        .x-tabs-line-wrapper {
            width: 100%;
            position: relative;
            top: 0;
            left: 0;
            background-color: #d3d3d3;
            height: 1px;

            .x-tabs-line {
                background-color: $tab-color;
                height: 200%;
                position: absolute;
                bottom: 0;
                left: 0;
                transition: left $animate-time, width $animate-time;
            }
        }

        .x-tabs-content {
            width: 100%;
            overflow: hidden;

            .x-tabs-body {
                width: 100%;
                white-space: nowrap;
                transform: translateX(0);
                transition: transform $animate-time;
                font-size: 0;

                > * {
                    font-size: initial;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }

    }
</style>
