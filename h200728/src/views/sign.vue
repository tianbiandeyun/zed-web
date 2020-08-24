<template>
    <section class="sign-container">

        <div class="sign_count">


        </div>

        <div class="reward_box">

        </div>

    </section>
</template>

<script>
    export default {
        name: "sign",
        mounted(){
            new Promise()
        }
    }
</script>

<style lang="less" scoped>

    .sign-container {
        height: 100%;
        background-color: @default-app-color-primary;
        background-image: url("../assets/images/LuckyDraw@3x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 700px;

        .sign_count {
            height: 360px;
            border: 1px solid black;
        }

        .reward_box {
            background-color: #fff;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;
            width: 700px;
            padding: 20px;
            margin: 0 auto;
        }
    }

</style>