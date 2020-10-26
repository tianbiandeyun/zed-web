<template>
    <div class="pullup">
        <div ref="scroll" class="pullup-wrapper">
            <div class="pullup-content">

                <div class="advisory">相关资讯</div>
                <ul class="pullup-list">

                    <li class="pullup-list-item" v-for="(item,index) in data" :key="index">

                        <div class="pullup-list-item-top-bottom">
                            <h1>{{index}} - {{item.title}}</h1>
                            <div
                                    class="pullup-list-item-top-bottom-images"
                                    v-if="item.imageArray.length !== 0"
                            >
                                <img v-for="(it,index) in item.imageArray" :src="it" alt="">
                            </div>
                            <div class="time">
                                {{item.author}}：{{item.publishTime}}
                            </div>
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
                d: 0,
                isPullUpLoad: false,
                data: [],
                page: 1
            }
        },
        async mounted() {
            this.initBscroll();
            await this.requestData();
        },
        methods: {
            initBscroll() {
                this.bscroll = new BScroll(this.$refs.scroll, {
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

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_wjj_article_list,
                    fps: {
                        open_id: '1',
                        page: this.page,
                        channel_id: 1094
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
        padding: 40px;

        .pullup-wrapper {
            height: 100%;
            overflow: hidden;

            .pullup-content {

                .advisory {
                    border: 1px solid red;
                }

                .pullup-list {

                    .pullup-list-item {
                        margin-bottom: 20px;
                        border: 2px solid black;

                        .left-right-active {
                            background-color: black;
                        }

                        .pullup-list-item-top-bottom {
                            padding-bottom: 20px;

                            h1 {
                                font-size: 40px;
                                margin: 20px 0;
                            }
                        }

                        .pullup-list-item-top-bottom-images {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            align-items: center;
                            justify-items: center;

                            img {
                                display: block;
                                width: 200px;
                            }
                        }

                        .time {
                            font-size: 30px;
                            color: #888;
                            margin-top: 20px;
                        }

                    }

                }
            }
        }

        .pullup-tips {
            padding: 20px;
            text-align: center;
            color: #999;
        }

    }


</style>