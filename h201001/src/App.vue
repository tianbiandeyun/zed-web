<template>
    <div id="app">
        <transition name="effect">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "",
        mounted() {
            this.$Utils.setDocumentTitle('十一送祝福')
        }
    }
</script>

<style lang="less" scoped>

    .effect-enter, .effect-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }

    .effect-enter-active, .effect-leave-active {
        transition: all .3s ease-in-out;
    }

</style>
