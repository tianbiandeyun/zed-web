<template>
    <section class="header-container">

        <div class="header-left">投融部门关键字查询</div>
        <div class="header-right"></div>

    </section>
</template>

<script>
    import {Search} from 'vant';

    export default {
        name: "header-container",
        components: {Search},
        data() {
            return {
                value: '',
            };
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    .header-container {
        .default-box-sizing;
        font-size: @default-font-size-16;
        background-color: @default-app-color-primary;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: @default-header-height;

        div {
            height: 100%;
        }

        .header-left {
            float: left;
            text-align: center;
            line-height: @default-header-height;
            width: @default-menu-left-width;
            font-weight: bold;
            font-size: @default-font-size-40;
            color: #fff;
        }

        .header-right {
            float: right;
        }
    }
</style>