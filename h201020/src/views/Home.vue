<template>

    <div class="pullup">

        <div ref="scroll" class="pullup-wrapper">

            <div class="pullup-content">

                <div class="header-container">
                    <div class="header-left">
                        <img :src="header_des.img_url" alt="">
                    </div>
                    <div class="header-right">
                        <p class="header-right-title">{{header_des.title}}</p>
                        <p class="header-right-des">{{header_des.describe}}</p>
                    </div>
                </div>

                <div class="advisory">相关资讯</div>
                <ul class="pullup-list">

                    <li class="pullup-list-item" v-for="(item,index) in data" :key="index" @click="handler(item)">

                        <!--多图-->
                        <div class="pullup-list-item-top-bottom" v-if="item.imageArray.length !== 0">

                            <h1>{{item.title}}</h1>

                            <div class="pullup-list-item-top-bottom-images">
                                <img v-for="(it,index) in item.imageArray" :src="it" alt="">
                            </div>

                            <div class="time">{{item.author}}：{{item.publishTime}}</div>

                        </div>

                        <!--少图-->
                        <div class="pullup-list-item-left-right" v-else>

                            <div class="pullup-list-item-left-right-top">
                                <div class="left"><h1>{{item.title}}</h1></div>
                                <div class="right"><img :src="item.poster" alt=""></div>
                            </div>

                            <div class="time">{{item.author}}：{{item.publishTime}}</div>

                        </div>

                    </li>

                </ul>

                <div class="pullup-tips">
                    <div v-if="!isPullUpLoad" class="before-trigger">
                        <span class="pullup-txt">下拉加载更多</span>
                    </div>
                    <div v-else class="after-trigger">
                        <span class="pullup-txt">加载中...</span>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import BScroll from '@better-scroll/core';
    import Pullup from '@better-scroll/pull-up';
    import {Toast} from 'vant'

    BScroll.use(Pullup);

    export default {
        data() {
            return {
                isPullUpLoad: false,
                header_des: '',
                data: [],
                page: 1,
                id: 1094
            }
        },
        async mounted() {
            this.initBscroll();
            await this.requestData();
        },
        methods: {
            handler(res) {
                window.location.href = res.url;
            },
            initBscroll() {
                this.bscroll = new BScroll(this.$refs.scroll, {
                    click: true,
                    pullUpLoad: {
                        threshold: -50
                    }
                });

                this.bscroll.on('pullingUp', this.pullingUpHandler)
            },
            async pullingUpHandler() {
                this.isPullUpLoad = true;

                await this.requestData();

                this.bscroll.finishPullUp();
                this.bscroll.refresh();
                this.isPullUpLoad = false
            },
            async requestData() {

                Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0,
                    overlay: true
                });

                await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_special_info,
                    fps: {
                        channel_id: this.id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.header_des = res.back_value;
                    this.$Utils.setDocumentTitle(res.back_value.title)
                });

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_wjj_article_list,
                    fps: {
                        open_id: '1',
                        page: this.page,
                        channel_id: this.id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    if (res.back_value.length === 0) {
                        Toast.clear();
                        Toast('暂无更多');
                    } else {
                        setTimeout(() => {
                            this.data = [...this.data, ...res.back_value];
                            this.page++;
                            Toast.clear();
                        }, 500)
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>

    .pullup {
        height: 100%;
        background-color: #e8eaec;

        .pullup-wrapper {
            height: 100%;
            overflow: hidden;

            .pullup-content {

                .header-container {
                    background-color: #fff;
                    padding: 20px 40px;
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    grid-column-gap: 20px;

                    .header-left {
                        font-size: 0;
                        height: 280px;
                        border: 1px solid #e8eaec;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .header-right {

                        .header-right-title {
                            font-size: 36px;
                            font-weight: bold;
                            margin-bottom: 20px;

                        }

                        .header-right-des {
                            font-size: 30px;
                            line-height: 1.24;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 6;
                            line-clamp: 6;
                            -webkit-box-orient: vertical;
                        }
                    }
                }

                .advisory {
                    font-size: 36px;
                    font-weight: bold;
                    padding: 20px 40px;
                }

                .pullup-list {

                    .pullup-list-item {
                        padding: 10px 40px 0px 40px;
                        margin-bottom: 20px;
                        background-color: #fff;

                        .pullup-list-item-top-bottom {
                            padding-bottom: 20px;

                            h1 {
                                font-size: 34px;
                                margin: 20px 0;
                            }
                        }

                        .pullup-list-item-top-bottom-images {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            align-items: center;
                            justify-items: center;
                            height: 160px;
                            grid-column-gap: 10px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .time {
                            font-size: 30px;
                            color: #888;
                            margin-top: 20px;
                        }

                        .pullup-list-item-left-right {
                            padding-bottom: 20px;

                            .pullup-list-item-left-right-top {
                                display: grid;
                                grid-template-columns: 3fr 1fr;
                                grid-column-gap: 10px;

                                .left {

                                    h1 {
                                        font-size: 36px;
                                    }
                                }

                                .right {
                                    width: 200px;
                                    font-size: 0;

                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }

                            }
                        }

                    }

                }
            }
        }

        .pullup-tips {
            padding: 20px 20px 80px 20px;
            text-align: center;
            color: #999;
        }

    }


</style>