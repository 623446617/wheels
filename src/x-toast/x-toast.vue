<template>
    <div class="x-toast">{{message}}</div>
</template>

<script>
    export default {
        name: "x-toast",
        data() {
            return {
                message: ''
            }
        },
        methods: {
            setMessage(message) {
                this.message = message;
            }
        }
    };
</script>

<style scoped lang="scss">
    .x-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        background-color: rgba(0, 0, 0, .6);
        padding: 3px 10px;
        border-radius: 3px;
        color: #ffffff;
    }
</style>
