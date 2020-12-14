<template>
    <section class="home-container" v-if="page_show">

        <div class="banner">
            <button @click='goTest'>点击测评</button>
        </div>

        <div v-for="(item,index) in video_list" :key="index">
            <div class="video-list">
                <div class="details" @click="showDetails(item)">
                    <p class="details-title">{{item.title}}</p>
                    <p class="details-sub">直播时间：{{item.start_date}}</p>
                    <p class="details-sub">主讲人：{{item.name}}</p>
                </div>

                <div class="operat" v-if="buttonType[index] === '观看直播'">
                    <button class="yyActive" @click="go(buttonType[index],item)">{{buttonType[index]}}
                    </button>
                </div>

                <div class="operat" v-if="buttonType[index] === '立即预约'">

                    <button class="zbActive" v-if="buttonType[index] === '立即预约' && video_status_list[index].status">
                        已预约
                    </button>

                    <button v-else class="zbActive"
                            @click="go(buttonType[index],item,index)">{{buttonType[index]}}
                    </button>

                </div>

                <div class="operat" v-if="buttonType[index] === '直播回放'">
                    <button class="hfActive" @click="go(buttonType[index],item)">{{buttonType[index]}}
                    </button>
                </div>
            </div>
        </div>

        <transition name="fade">
            <div class="reservation" v-if="show">
                <div class="reservation-main">
                    <div class="qr">
                        <img :src="qr_img" alt="">
                        <!--<p>长按识别二维码</p>-->
                        <!--<p>预约本场直播</p>-->
                    </div>
                    <div class="close" @click="colsePopup">
                        <img src="../assets/images/close.png" alt="">
                    </div>
                </div>
            </div>
        </transition>

    </section>
</template>

<script>
    import {Dialog, Popup} from 'vant';
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        components: {[Dialog.Component.name]: Dialog.Component, Popup},
        data() {
            return {
                is_popup: false,
                page_show: false,
                show: false,
                qr_img: '',
                video_list: '', // 视频列表
                video_status_list: [], // 视频状态列表
                list_index: '', // 点击的哪一个视频的 下标
                trigger_key: '' // 用来查询 是否预约的 参数
            }
        },
        async mounted() {
            this.$utils.setDocumentTitle('创新创业大讲堂');

            // 获取 openid
            if (this.getOpenid_info === '') {
                await this.$store.dispatch('_getOpenid', {
                    im: this.$config.PROJECT_INTERFACE.getopenid,
                    url: this.$config.REQUEST_URL
                })
            }

            // 判断是否组册信息
            await this._hasUserInfo();

            // 微信分享
            new this.$WxShare(this.wx_config.back_value, {
                title: '创新创业大讲堂',
                details: '为大学生量身打造的创新创业课',
                link: await this.$utils.makeShareLink(),
                image: this.$config.PROJECT_SHARE_REQUEST + '/h/' + this.$config.PROJECT_ID + '/dist/share.png'
            }, false).init();
        },
        methods: {
            showDetails(res) {

                Dialog.alert({
                    title: res.title,
                    message: res.introduce,
                    confirmButtonText: '关闭'
                }).then(() => {
                    // on close
                });

            },
            /**
             * 关闭预约框
             * */
            colsePopup() {

                this.$store.dispatch('fetch', {
                    im: this.$config.PROJECT_INTERFACE.get_appointment_status,
                    fps: {
                        open_id: this.getOpenid_info.back_value.open_id,
                        trigger_key: this.trigger_key
                    },
                    url: this.$config.REQUEST_URL
                }).then(res => {

                    this.video_status_list.splice(this.list_index, 1, {status: res.back_value});

                    this.show = false;
                });
            },
            /**
             * 前往测试
             * */
            goTest() {
                this.$router.push('/test')
            },
            /**
             * 前往观看视频
             * */
            go(type, item, index = '') {

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

                            this.list_index = index; // 设置 点击 某个 视频 下标
                            this.trigger_key = item.trigger_key; // 设置 查询某个视频 是否预约
                            this.qr_img = item.fixed_date_qr; // 设置二维码
                            this.show = true;

                            return false;

                        }
                        // this.$router.push(`/video?video_url=${item.url}&video_id=${item.id}&type=${encodeURI(encodeURI(type))}&qr=${item.download_qr}`)
                        window.location.href = `http://f.hztc.dev.hztcapp.com/h/h200727/video/video.html?video_url=${item.url}&id=${this.getOpenid_info.back_value.open_id}&video_id=${item.id}&type=${encodeURI(encodeURI(type))}&qr=${item.download_qr}`
                    }
                });

            },
            /**
             * 判断是否组册信息
             * */
            async _hasUserInfo() {

                await this.$store.dispatch('_getWxConfig', {
                    im: this.$config.PROJECT_INTERFACE.get_jsconf,
                    fps: {
                        url: encodeURIComponent(window.location.href.split('#')[0])
                    },
                    url: this.$config.REQUEST_URL
                });

                // 设置 PV
                await this.$store.dispatch('_setPv', {
                    im: this.$config.PROJECT_INTERFACE.set_pv_statistics,
                    fps: {
                        info_key: '视频列表',
                    },
                    url: this.$config.REQUEST_URL
                });

                // 设置 UV
                await this.$store.dispatch('_setUv', {
                    im: this.$config.PROJECT_INTERFACE.set_uv_statistics,
                    fps: {
                        open_id: this.getOpenid_info.back_value.open_id,
                    },
                    url: this.$config.REQUEST_URL
                });

                // 1 省 / 学校
                await this.$store.dispatch('_hasUserInfo_zuzhi', {
                    im: this.$config.PROJECT_INTERFACE.has_user_info,
                    fps: {
                        open_id: this.getOpenid_info.back_value.open_id,
                        type: 1
                    },
                    url: this.$config.REQUEST_URL
                }).then(async res => {

                    if (res.back_value === false) {
                        this.$router.replace('/login');
                    } else {
                        this.page_show = true;

                        // 获取 是否答题，打过则不现实弹框
                        this.$store.dispatch('_getQuestionResult', {
                            im: this.$config.PROJECT_INTERFACE.get_answer_record,
                            fps: {
                                open_id: this.getOpenid_info.back_value.open_id,
                            },
                            url: this.$config.REQUEST_URL
                        }).then(res => {
                            if (res.back_value === '') {

                                setTimeout(() => {
                                    Dialog.confirm({
                                        confirmButtonText: '测试',
                                        cancelButtonText: '否',
                                        message: '学习之前先做个“职前测试吧”',
                                    }).then(() => {
                                        this.$router.push('/test')
                                    }).catch(() => {
                                    })
                                }, 300)

                            }
                        });


                    }

                });


                // 如果个人和组织信息都是 true 则显示，视频列表
                if (this.hasUserInfo_zuzhi.back_value) {
                    this.$store.dispatch('_getVideoList', {
                        im: this.$config.PROJECT_INTERFACE.get_video_list,
                        fps: {
                            open_id: this.getOpenid_info.back_value.open_id
                        },
                        url: this.$config.REQUEST_URL
                    }).then(res => {
                        let result = res.back_value;
                        this.video_list = result;
                        let video_list = [];

                        for (let i = 0; i < result.length; i++) {
                            video_list.push({
                                // id: result[i].id,
                                // title: result[i].title,
                                status: result[i].trigger_key_status
                            })
                        }

                        this.video_status_list = video_list;

                        console.log(this.video_status_list)

                        // console.log(res.back_value.trigger_key_status)

                    });
                }

            }
        },
        computed: {
            ...mapGetters([
                'getOpenid_info',
                'hasUserInfo_zuzhi',
                'hasUserInfo_geren',
                'wx_config'
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
                /*background-size: 100% auto;*/
                /*background-repeat: no-repeat;*/
                /*background-image: url(../assets/images/tip.png);*/
                display: grid;
                grid-template-rows: 6fr 1fr;
                justify-items: center;
                align-items: center;

                .qr {

                    img {
                        width: 100%;
                        /*height: 340px;*/
                        margin-bottom: 20px;
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