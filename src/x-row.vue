<template>
    <div class="x-row">
        <slot></slot>
    </div>
</template>

<script>
    import {childValidatorMixin} from "./mixins";

    export default {
        name: "x-row",
        mixins: [childValidatorMixin],
        mounted() {
            this.validator('x-col');
        }
    };
</script>

<style scoped lang="scss">
    .x-row {
        display: flex;
    }
</style>
