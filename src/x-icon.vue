<template>
    <svg class="x-icon">
        <use :xlink:href="`#x-${name}`"></use>
    </svg>
</template>

<script>
    export default {
        name: "x-icon",
        props: {
            name: {
                type: String,
                default: '',
                validator(val) {
                    return val;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-icon {
        width: 1em;
        height: 1em;
    }
</style>
