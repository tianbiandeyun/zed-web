<template>
    <section class="fristComponent">

        <div class="frist-title">
            <img src="../../assets/images/1/titile.png" alt="">
        </div>

        <div class="frist-logo">
            <img src="../../assets/images/1/logo.png" alt="">
        </div>

        <slot></slot>

        <div class="frist-bottom">
            <img src="../../assets/images/1/name.png" alt="">
        </div>

    </section>
</template>

<script>
    export default {
        name: "fristComponent"
    }
</script>

<style lang="less">
    .fristComponent {
        height: 100%;
        background-color: #d9e3eb;
        text-align: center;
        padding: 30px 30px 100px 30px;

        .frist-title {
            margin-bottom: 30px;
            img {
                width: 80%;
            }
        }
        .frist-logo {
            margin-bottom: 60px;
            img {
                width: 80%;
            }
        }
        .frist-button {
            border: 1px solid black;
            height: 200px;
        }
        .frist-bottom {
            margin-bottom: 40px;
            padding-bottom: 100px;

            img {
                width: 60%;
            }
        }
    }
</style>