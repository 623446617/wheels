<template>
    <svg class="x-icon" :class="{[name]: true}">
        <use :xlink:href="`#x-${name}`"/>
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
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading {
        animation: spin 1s infinite linear;
    }

    .x-icon {
        width: 1em;
        height: 1em;
    }
</style>
