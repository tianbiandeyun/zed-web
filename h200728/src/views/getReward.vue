<template>
    <section class="get_reward-container">

        <!--轮播-->
        <div class="get_reward_swiper">
            <Swipe class="swiper" :autoplay="3000" indicator-color="white">
                <SwipeItem v-for="(item,index) in swiper" :key="index">
                    {{item.id}}
                </SwipeItem>
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
                    <Field v-model="name" label="姓名" placeholder="请输入姓名"/>
                </div>

                <div>
                    <Field v-model="photo" type="tel" label="手机号" placeholder="请输入手机号"/>
                </div>

                <div>
                    <Field
                            v-model="photo_code"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                    >
                        <template #button>
                            <Button
                                    size="small"
                                    type="primary"
                                    color="#f7931e"
                                    @click="getCode"
                                    :disabled="button_disabled">
                                {{message}}
                            </Button>
                        </template>
                    </Field>
                </div>

            </div>

        </div>

        <Divider>为了完成后续奖品兑换服务，同意该信息提供给第三方</Divider>

        <!--提交-->
        <div class="submit">
            <button @click="submit">兑换</button>
        </div>


    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Swipe, SwipeItem, Field, Button, Divider, Toast} from 'vant';

    export default {
        name: "get_reward",
        components: {Swipe, SwipeItem, Field, Button, Divider, Toast},
        data() {
            return {
                swiper: [], // 轮播图
                message: '发送验证码', // 短信验证码按钮文字
                timer: null, // 定时器清除
                button_disabled: false, // 按钮禁用
                name: '', // 姓名
                photo: '', // 电话号码
                photo_code: '' // 验证码
            }
        },
        mounted() {
            this.$Utils.setDocumentTitle('福利详情');

            /**
             * 获取轮播图
             * */
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_banner,
                fps: {
                    page_name: '商品轮播图'
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.swiper = res.back_value;
            })

        },
        methods: {
            /**
             * 提交信息
             * */
            submit() {
                const that = this;
                Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0
                });

                if (this.name === '') {
                    Toast.clear();
                    window.alert('姓名不能为空')
                    return false;
                }

                if (this.photo === '') {
                    Toast.clear();
                    window.alert('手机号码不能为空')
                    return false;
                }

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.set_prize_user_info,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        username: this.name,
                        phonenum: this.photo,
                        phonecode: this.photo_code
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    Toast.clear();
                    this.$Alert.show({
                        title: '提交成功',
                        noRewardImg: false,
                        content: {
                            alertType: 'noReward',
                            content: '翘首以待你的礼物吧'
                        },
                        confirmText: '关闭',
                        closeShow: false,
                        operatButton() {
                            that.$router.replace('/')
                        }
                    });
                })
            },
            /**
             * 点击获取验证码
             * */
            async getCode() {

                Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0
                });

                if (this.photo === '') {
                    Toast.clear();
                    window.alert('请填写手机')
                    return false;
                }

                let code_result = await this._getPhotoCode(this.photo);

                if (code_result.result === 'failure' && code_result.error_code === 6180516006) {
                    Toast.clear();
                    window.alert('电话已存在，无法重复注册')
                    return false;
                }

                if (code_result.back_value) {
                    Toast.clear();
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        let code = TIME_COUNT;
                        this.button_disabled = true;
                        this.message = `${TIME_COUNT}s后获取`;
                        this.timer = setInterval(() => {
                            if (code > 0 && code <= TIME_COUNT) {
                                code--;
                                this.message = `${code}s后获取`;
                            } else {
                                clearInterval(this.timer);
                                this.timer = null;
                                this.message = '发送验证码';
                                this.button_disabled = false;
                            }
                        }, 1000);
                    } else {
                        console.log('不能一直点')
                    }
                }

            },
            /**
             * 发送短信
             * */
            _getPhotoCode(photo) {
                return this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.send_phone_identifying_code,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        phonenum: photo
                    },
                    url: this.$Config.REQUEST_URL
                })
            }
        },
        computed: {
            ...mapGetters([
                'openid_info'
            ])
        }
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

        .submit {
            text-align: center;
            padding-top: 20px;

            button {
                background-color: @default-app-color-primary;
                font-size: @default-font-size-38;
                color: #fff;
                width: 200px;
                padding: 20px 0;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
            }
        }
    }


</style>