<template>
    <section class="home-container" v-if="page_show">

        <div class="banner">
            <button @click='goTest'>点击测评</button>
        </div>

        <div v-for="(item,index) in video_list" :key="index">
            <div class="video-list">
                <div class="details">
                    <p class="details-title">{{item.title}}</p>
                    <p class="details-sub">直播时间：{{item.start_date}}</p>
                </div>
                <div class="operat">
                    <button :class="[
                            { yyActive: buttonType[index] === '观看直播' },
                            { zbActive: buttonType[index] === '立即预约' },
                            { hfActive: buttonType[index] === '直播回放' }
                        ]"
                            @click="go(buttonType[index],item)">
                        {{buttonType[index]}}
                    </button>
                </div>
            </div>
        </div>

        <transition name="fade">
            <div class="reservation" v-if="show">
                <div class="reservation-main">
                    <div class="qr">
                        <img :src="qr_img" alt="">
                        <p>长按识别二维码</p>
                        <p>预约本场直播</p>
                    </div>
                    <div class="close" @click="show = false">
                        <img src="../assets/images/close.png" alt="">
                    </div>
                </div>
            </div>
        </transition>

    </section>
</template>

<script>
    // import share from '../utils/share'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        components: {},
        // mixins: [share],
        data() {
            return {
                page_show: false,
                show: false,
                qr_img: '',
                video_list: ''
            }
        },
        async mounted() {
            this.$utils.setDocumentTitle('职业倾向测评');

            // 获取 openid
            if (this.getOpenid_info === '') {
                await this.$store.dispatch('_getOpenid', {
                    im: this.$config.PROJECT_INTERFACE.getopenid,
                    url: this.$config.REQUEST_URL
                })
            }

            // 判断是否组册信息
            this._hasUserInfo();
        },
        methods: {
            /**
             * 前往测试
             * */
            goTest() {
                this.$router.push('/test')
            },
            /**
             * 前往观看视频
             * */
            go(type, item) {

                this.$store.dispatch('_setVideoClickCount', {
                    im: this.$config.PROJECT_INTERFACE.set_video_click_count,
                    fps: {
                        video_id: item.id,
                        video_type: type
                    },
                    url: this.$config.REQUEST_URL
                }).then(res => {
                    if (res.back_value) {
                        if (type === '立即预约') {
                            this.qr_img = item.fixed_date_qr;
                            this.show = true;
                            return false;
                        }
                        window.location.href = `http://f.hztc.dev.hztcapp.com/h/h200727/video/video.html?video_url=${item.url}&id=${this.getOpenid_info.back_value.open_id}&video_id=${item.id}&type=${encodeURI(encodeURI(type))}&qr=${item.download_qr}`
                    }
                });

            },
            /**
             * 判断是否组册信息
             * */
            async _hasUserInfo() {

                // 设置 PV
                await this.$store.dispatch('_setPv', {
                    im: this.$config.PROJECT_INTERFACE.set_pv_statistics,
                    fps: {
                        info_key: '视频列表',
                    },
                    url: this.$config.REQUEST_URL
                }).then(res => {
                    // 设置 UV
                    return this.$store.dispatch('_setUv', {
                        im: this.$config.PROJECT_INTERFACE.set_uv_statistics,
                        fps: {
                            open_id: this.getOpenid_info.back_value.open_id,
                        },
                        url: this.$config.REQUEST_URL
                    })
                }).then(res => {
                    // 1 组织
                    return this.$store.dispatch('_hasUserInfo_zuzhi', {
                        im: this.$config.PROJECT_INTERFACE.has_user_info,
                        fps: {
                            open_id: this.getOpenid_info.back_value.open_id,
                            type: 1
                        },
                        url: this.$config.REQUEST_URL
                    }).then(res => {
                        if (res.back_value === false) {
                            this.$router.replace('/login');
                        } else {
                            // 2 个人信息
                            return this.$store.dispatch('_hasUserInfo_geren', {
                                im: this.$config.PROJECT_INTERFACE.has_user_info,
                                fps: {
                                    open_id: this.getOpenid_info.back_value.open_id,
                                    type: 2
                                },
                                url: this.$config.REQUEST_URL
                            })
                        }
                    }).then(res => {
                        if (res.back_value === false) {
                            this.$router.replace('/info');
                        } else {
                            this.page_show = true;
                        }
                    });
                });

                if (this.hasUserInfo_geren.back_value && this.hasUserInfo_zuzhi.back_value) {
                    this.$store.dispatch('_getVideoList', {
                        im: this.$config.PROJECT_INTERFACE.get_video_list,
                        fps: {
                            open_id: this.getOpenid_info.back_value.open_id
                        },
                        url: this.$config.REQUEST_URL
                    }).then(res => {
                        this.video_list = res.back_value;
                    });
                }

            }
        },
        computed: {
            ...mapGetters([
                'getOpenid_info',
                'hasUserInfo_zuzhi',
                'hasUserInfo_geren'
            ]),
            /**
             * 日期对比
             * */
            buttonType() {

                let _b = [];

                for (let i = 0; i < this.video_list.length; i++) {

                    let start = this.video_list[i].start_date;
                    let end = this.video_list[i].end_date;

                    let now_time = new Date();

                    let year = now_time.getFullYear();
                    let month = parseInt(now_time.getMonth() + 1) < 10 ? "0" + parseInt(now_time.getMonth() + 1) : parseInt(now_time.getMonth() + 1);
                    let day = now_time.getDate() < 10 ? "0" + now_time.getDate() : now_time.getDate();

                    let hour = now_time.getHours() < 10 ? '0' + now_time.getHours() : now_time.getHours();
                    let minute = now_time.getMinutes() < 10 ? '0' + now_time.getMinutes() : now_time.getMinutes();
                    let second = now_time.getSeconds() < 10 ? '0' + now_time.getSeconds() : now_time.getSeconds();

                    let start_time = start.replace(/-/g, "/");
                    let end_time = end.replace(/-/g, "/");
                    now_time = `${year}-${month}-${day} ${hour}:${minute}:${second}`.replace(/-/g, "/");

                    if (Date.parse(now_time) >= Date.parse(start_time) && Date.parse(now_time) <= Date.parse(end_time)) {
                        _b.push('观看直播')
                    }

                    if (Date.parse(now_time) < Date.parse(start_time)) {
                        _b.push('立即预约')
                    }

                    if (Date.parse(now_time) > Date.parse(end_time)) {
                        _b.push('直播回放')
                    }

                }
                return _b;
            }
        }
    }
</script>
<style lang="less" scoped>
    .fade-enter, .fade-leave-to {
        transform: scale(1.5);
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .2s ease-in;
    }

    .home-container {
        background-color: @default-app-color-background;

        button {
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
        }

        .banner {
            height: 418px;
            background-size: 100% auto;
            background-repeat: no-repeat;
            background-image: url(../assets/images/test.png);
            position: relative;
            margin-bottom: 20px;

            button {
                width: 260px;
                height: 78px;
                background-color: #fff;
                color: @default-font-color-content;
                font-size: @default-font-size-30;
                position: absolute;
                bottom: 100px;
                left: 60px;
            }
        }

        .reservation {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .8);
            display: grid;
            justify-items: center;
            align-items: center;

            .reservation-main {
                width: 80%;
                height: 900px;
                background-size: 100% auto;
                background-repeat: no-repeat;
                background-image: url(../assets/images/tip.png);
                display: grid;
                grid-template-rows: 6fr 1fr;
                justify-items: center;
                align-items: center;

                .qr {

                    img {
                        width: 340px;
                        height: 340px;
                        margin-bottom: 20px;
                    }

                    p {
                        text-align: center;
                        line-height: 1.4;
                        color: #fff;
                        font-size: @default-font-size-30;
                    }
                }

                .close {

                    img {
                        width: 80px;
                        height: 80px;
                    }

                }
            }
        }

        .video-list {
            background-color: #fff;
            display: grid;
            grid-template-columns: 3fr 1fr;
            margin-bottom: 20px;

            .details {
                padding: 20px;
                line-height: 1.6;

                .details-title {
                    font-size: @default-font-size-36;
                    color: @default-font-color-content;
                }
                .details-sub {
                    font-size: @default-font-size-30;
                    color: @default-font-color-sub;
                }
            }

            .operat {
                display: grid;
                justify-items: center;
                align-items: center;

                button {
                    width: 140px;
                    height: 60px;
                    color: @default-font-color-content;
                    font-size: @default-font-size-24;
                }

                .yyActive {
                    background-color: #f0ad4e !important;
                    color: #fff !important;
                }

                .zbActive {
                    background-color: #e70012 !important;
                    color: #fff !important;
                }

                .hfActive {
                    background-color: #939292 !important;
                    color: #fff !important;
                }
            }
        }
    }
</style>