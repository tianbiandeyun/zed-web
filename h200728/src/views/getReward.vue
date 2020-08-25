<template>
    <section class="get_reward-container">

        <!--轮播-->
        <div class="get_reward_swiper">
            <Swipe class="swiper" :autoplay="3000" indicator-color="white">
                <SwipeItem>1</SwipeItem>
                <SwipeItem>2</SwipeItem>
                <SwipeItem>3</SwipeItem>
                <SwipeItem>4</SwipeItem>
            </Swipe>
        </div>

        <!--内容-->
        <div class="content">

            <div class="reward_details">
                <h1>奖品说明：</h1>
                <p>奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明
                    奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明</p>
                <p>奖品说明奖品说明奖品说明奖品说明奖品说明奖品说明</p>
            </div>

            <div class="write_information">

                <h1>领取人完整信息：</h1>

                <div>
                    <Field v-model="text" label="姓名" placeholder="请输入姓名"/>
                </div>

                <div>
                    <Field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号"/>
                </div>

                <div>
                    <Field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                    >
                        <template #button>
                            <Button size="small" type="primary" color="#f7931e">发送验证码</Button>
                        </template>
                    </Field>
                </div>

            </div>

        </div>

        <Divider>为了完成后续奖品兑换服务，同意该信息提供给第三方</Divider>

        <!--提交-->


    </section>
</template>

<script>
    import {Swipe, SwipeItem, Field, Button, Divider} from 'vant';

    export default {
        name: "get_reward",
        components: {Swipe, SwipeItem, Field, Button, Divider}
    }
</script>

<style lang="less" scoped>

    .get_reward-container {

        .get_reward_swiper {

            .swiper {

                .van-swipe-item {
                    color: #fff;
                    font-size: 20px;
                    line-height: 340px;
                    text-align: center;
                    background-color: #39a9ed;
                }
            }
        }

        .content {
            padding: 40px 20px;

            .reward_details, .write_information {
                border-radius: @default-element-border-radius;
                padding: 20px;
            }

            .reward_details {
                margin-bottom: 20px;

                h1 {
                    color: @default-font-color-title;
                    font-size: @default-font-size-30;
                    line-height: 0;
                }

                p {
                    font-size: @default-font-size-26;
                    line-height: 1.6;
                    color: @default-font-color-sub;
                }
            }

            .write_information {

                h1 {
                    color: @default-font-color-title;
                    font-size: @default-font-size-30;
                    line-height: 0;
                }

            }
        }
    }


</style>