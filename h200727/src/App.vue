<template>
    <div id="app">
        <transition name="effect">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: ""
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
