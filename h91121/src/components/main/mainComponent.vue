<template>
    <section class="mainComponent">
        <!--侧边栏点击之后，显示区域-->
        <router-view></router-view>
    </section>
</template>

<script>
    export default {
        name: "mainComponent"
    }
</script>

<style lang="less">
    #boxSizing {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .mainComponent {
        border-left: 1px solid #dcdee2;
        margin-left: 340px;
        #boxSizing;
        height: calc(100% - 100px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 20px;
    }
</style>