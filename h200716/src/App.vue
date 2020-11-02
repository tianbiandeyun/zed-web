<template>
    <div id="app">
        <router-view name="header"></router-view>
        <div class="station-header"></div>
        <router-view></router-view>
        <div class="station-footer"></div>
        <router-view name="footer"></router-view>
    </div>
</template>

<style lang="less" scoped>
    #app {

        .station-header {
            height: @default-header-height;
        }
        .station-footer {
            height: @default-footer-height;
        }
    }
</style>
