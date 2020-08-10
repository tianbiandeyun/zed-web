<template>
    <section class="rules-container">

        <div class="title">
            <img src="../assets/images/rules.png" alt="">
        </div>

        <div class="rules">
            <div class="rules-title">一、活动时间</div>
            <div class="rules-content">
                <p>发大发思考方法卡距离放假啊了飞机撒方式</p>
            </div>

            <div class="rules-title">二、活动时间</div>
            <div class="rules-content">
                <p>发大发思考方法卡距离放假啊了飞机撒方式</p>
                <p>发大发思考方法卡距离放假啊了飞机撒方式发大发思考方法卡距离放假啊了飞机撒方式发大发思考方法卡距离放假啊了飞机撒方式</p>
                <p>发大发思考方法卡距离放假啊了飞机撒方式</p>
                <p>发大发思考方法卡距离放假啊了飞机撒方式</p>
                <p>发大发思考方法卡距离放假啊了飞机撒方式</p>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "rules",
        mounted() {
            this.$utils.setDocumentTitle('活动规则说明')
        }
    }
</script>

<style lang="less" scoped>

    .rules-container {

        .title {
            border: 1px solid black;
            text-align: center;
            padding-top: 100px;
        }

        .rules {
            border: 1px solid black;
            padding: 20px 40px;

            .rules-title {
                font-size: @default-font-size-36;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .rules-content {
                text-indent: 55px;
                font-size: @default-font-size-28;
                p {
                    line-height: 1.5;
                }
            }
        }
    }

</style>