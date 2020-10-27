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
                    <li v-for="(item,index) in data" :key="index" class="pullup-list-item" @click="handler(item)">

                        <div class="more-images" v-if="item.imageArray.length !== 0">

                            <h1>{{item.title}}</h1>
                            <div class="more-images-box">
                                <img v-for="(it,index) in item.imageArray" :src="it" alt="">
                            </div>
                            <div class="time">{{item.author}}：{{item.publishTime}}</div>

                        </div>

                        <div class="lose-images" v-else>

                            <div class="lose-images-box">
                                <div class="lose-images-left">
                                    <h1>{{item.title}}</h1>
                                </div>
                                <div class="lose-images-right">
                                    <img :src="item.poster" alt="">
                                </div>
                            </div>

                            <div class="time">{{item.author}}：{{item.publishTime}}</div>
                        </div>

                    </li>
                </ul>
                <div class="pullup-tips">
                    <div v-if="!isPullUpLoad" class="before-trigger">
                        <span class="pullup-txt">{{more}}</span>
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
                more: '上拉加载更多',
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

                return this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_special_info,
                    fps: {
                        channel_id: this.id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {

                    this.header_des = res.back_value;
                    this.$Utils.setDocumentTitle(res.back_value.title)

                    return this.$store.dispatch('fetchData', {
                        im: this.$Config.PROJECT_INTERFACE.get_wjj_article_list,
                        fps: {
                            open_id: '1',
                            page: this.page,
                            channel_id: this.id
                        },
                        url: this.$Config.REQUEST_URL
                    })

                }).then(res => {
                    if (res.back_value.length === 0) {
                        this.more = '暂无更多';
                        Toast.clear();
                        Toast('暂无更多');
                    } else {
                        this.data = [...this.data, ...res.back_value];
                        this.page++;
                        Toast.clear();
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
        }

        .advisory {
            font-size: 36px;
            font-weight: bold;
            padding: 20px 40px;
        }

        .header-container {
            background-color: #fff;
            padding: 20px 40px;
            display: grid;
            grid-template-columns: 1.2fr 2fr;
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

        .pullup-list-item {
            padding: 10px 40px 0 40px;
            margin-bottom: 20px;
            background-color: #fff;

            .more-images {
                padding-bottom: 20px;

                h1 {
                    font-size: 34px;
                    margin: 20px 0;
                }

                .more-images-box {
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
            }

            .lose-images {
                padding-bottom: 20px;

                .lose-images-box {
                    display: grid;
                    grid-template-columns: 3fr 1fr;
                    grid-column-gap: 10px;

                    .lose-images-left {
                        h1 {
                            font-size: 36px;
                        }
                    }

                    .lose-images-right {
                        width: 200px;
                        font-size: 0;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .time {
                    font-size: 30px;
                    color: #888;
                    margin-top: 20px;
                }
            }

        }

        .pullup-tips {
            padding: 20px 20px 100px 20px;
            text-align: center;
            color: #999;
        }
    }

</style>