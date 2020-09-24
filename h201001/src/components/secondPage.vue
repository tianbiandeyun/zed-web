<template>
    <section class="second-page">

        <div class="top">

            <div class="top_left">

            </div>

            <div class="top_right">

            </div>

        </div>

        <div class="bottom">

        </div>

    </section>
</template>

<script> 
    export default {
        name: "secondPage"
    }
</script>

<style lang="less" scoped>
    .second-page {
        height: 100%;
        display: grid;
        grid-template-rows: repeat(2, 1fr);

        .top {
            background-image: url("../assets/images/10.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }

        .bottom {

        }

        div {
            border: 1px solid black;
        }
    }
</style>