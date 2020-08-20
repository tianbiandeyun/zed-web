<template>
    <section class="rules-container">

        <div class="title">
            <img src="../assets/images/rules.png" alt="">
        </div>

        <div class="rules">
            <div class="rules-title">一、活动时间</div>
            <div class="rules-content">
                <p>2020年X月X日起，活动结束时间另行通知。</p>
            </div>

            <div class="rules-title">二、活动规则</div>
            <div class="rules-content">
                <p>1、活动参与方式，报名参加创新创业大讲堂的学员。</p>
                <p>2、此测试共包含15道题，所有题为单选题，同一用户仅可测试一次。</p>
                <p>3、其他：</p>
                <p>① 同一微信号、手机号、均视为同一用户。</p>
                <p>② 以上测试仅供参考。</p>
                <p>③ 活动仅限在中华人民共和国境内（为本规则之目的，为避免疑义，不包括香港特别行政区、澳门特别行政区及台湾地区参与）的用户参与。</p>
                <p>④ 最终解释权归东方青创营所有。</p>
            </div>
        </div>

    </section>
</template>

<script>
    import share from '../utils/share'

    export default {
        name: "rules",
        mixins: [share],
        mounted() {
            this.$utils.setDocumentTitle('活动规则说明')
        }
    }
</script>

<style lang="less" scoped>

    .rules-container {
        height: 100%;
        background-color: red;
        padding: 0 40px 0 40px;

        .title {
            text-align: center;
            padding-top: 100px;
            margin-bottom: 30px;

            img {
                width: 240px;
            }
        }

        .rules {
            background-color: #fff;
            padding: 40px 40px 20px 40px;

            .rules-title {
                font-size: @default-font-size-36;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .rules-content {
                text-indent: 55px;
                font-size: @default-font-size-28;
                margin-bottom: 10px;

                p {
                    line-height: 1.5;
                }
            }
        }
    }

</style>