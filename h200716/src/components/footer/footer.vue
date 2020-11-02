<template>
    <section class="footer-container">
        北京慧致天诚企业管理咨询有限公司 {{app_serve}}
    </section>
</template>

<script>
    export default {
        name: "footer-container",
        data() {
            return {
                app_serve: this.$config.SERVE
            }
        }
    }
</script>

<style lang="less" scoped>
    .footer-container {
        .default-box-sizing;
        font-size: @default-font-size-34;
        text-align: center;
        background-color: @default-app-color-background;
        .default-padding-20-40();
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: @default-footer-height;
        color: @default-font-color-sub;
    }
</style>