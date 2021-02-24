<template>
    <section class="index-container">

        <div class="index-swipe">
            <Swipe class="swipe"
                   :autoplay="3000"
                   indicator-color="white"
            >
                <SwipeItem v-for="(item, index) in swipe_list" :key="index" @click="clickSwipe(item)">
                    <img :src="item.video_img" :alt="item.title">
                </SwipeItem>
            </Swipe>
        </div>

        <div class="index-tabs">
            <Tabs v-model="active"
                  color="#ff9900"
                  sticky
                  title-active-color="#17233d"
                  title-inactive-color="#515a6e"
                  @click="clickTab"
            >
                <Tab v-for="(item, index) in tab_list"
                     :key="index"
                     :title="item.name"
                     :name="item.id"
                     class="tab">

                    <div class="video-list" v-if="video_list.length !== 0">

                        <div class="video-item"
                             v-for="(item,index) in video_list"
                             :key="index"
                             @click="playVideo(item)"
                        >
                            <div class="video-item-img">
                                <img :src="item.video_img" :alt="item.name">
                            </div>
                            <div class="video-item-details">
                                <p>{{item.title}}</p>
                                <p>主持人：{{item.name}}</p>
                                <p>
                                    <img src="../assets/images/play.png" alt="">
                                    <span>：{{item.click_count}}</span>
                                </p>
                            </div>
                        </div>

                    </div>

                    <div v-if="video_list.length === 0" class="video-empty">
                        <Empty class="empty"
                               image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                               description="暂无视频">
                        </Empty>
                    </div>

                </Tab>
            </Tabs>
        </div>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Swipe, SwipeItem, Tab, Tabs, Empty} from 'vant';

    export default {
        name: 'Home',
        components: {Swipe, SwipeItem, Tab, Tabs, Empty},
        data() {
            return {
                swipe_list: [],
                tab_list: [],
                video_list: [],
                active: 0,
            }
        },
        async mounted() {

            this.$Toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });

            // 如果 openid 是空，则获取
            if (this.openid_info === '') {
                await this.$store.dispatch('getOpenid', {
                    im: this.$Config.PROJECT_INTERFACE.getopenid,
                    url: this.$Config.REQUEST_URL
                });
            }

            // 轮播图
            await this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_banner,
                fps: {
                    page_name: '青听学院',
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.swipe_list = res.back_value;
            });

            // tab
            await this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_video_grouping,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.tab_list = res.back_value;
            });

            // 视频列表
            await this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_curriculum_video_list,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                    video_grouping_id: 1,
                    start: 0,
                    end: 100
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.video_list = res.back_value;
            });

            this.$Toast.clear();

        },
        methods: {
            clickSwipe(res) {
                this.$router.push(`/search?search_id=${res.video_grouping_id}&title=${res.title}`)
            },
            clickTab(name) {
                this.$Toast.loading({
                    message: '加载中...',
                    duration: 0,
                    forbidClick: true,
                });
                // 视频列表
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_curriculum_video_list,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        video_grouping_id: name,
                        start: 0,
                        end: 100
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.video_list = [];
                    this.video_list = res.back_value;
                    this.$Toast.clear();
                })
            },
            playVideo(res) {
                this.$router.push(`/play?video_url=${res.video_url}&video_id=${res.id}`)
            }
        },
        computed: {
            ...mapGetters([
                "openid_info"
            ])
        }
    }
</script>
<style lang="less" scoped>

    .index-container {

        .index-swipe {
            background-color: #fff;
            margin-bottom: 20px;
            padding: 20px 40px;

            .swipe .van-swipe-item {

                img {
                    width: 100%;
                }
            }
        }

        .index-tabs {
            margin-bottom: 20px;

            .tabs {
                font-size: 60px;
            }

            .tab {

                .video-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 20px;
                    grid-row-gap: 20px;
                    padding: 20px 40px;

                    .video-item {
                        background-color: #fff;
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0px 0px 5px 5px rgb(220,215,215);
                        -webkit-box-shadow: 0px 0px 5px 5px rgb(220,215,215);
                        -moz-box-shadow: 0px 0px 5px 5px rgb(220,215,215);

                        .video-item-img {
                            font-size: 0;

                            img {
                                width: 100%;
                            }
                        }

                        .video-item-details {

                            p {
                                padding: 8px;

                                &:nth-of-type(1) {
                                    font-size: 26px;
                                    color: #17233d;
                                }

                                &:nth-of-type(2) {
                                    font-size: 24px;
                                    color: #515a6e;
                                }

                                &:nth-of-type(3) {
                                    font-size: 22px;
                                    color: #515a6e;
                                    display: grid;
                                    grid-template-columns: 40px 1fr;
                                    align-items: center;

                                    img {
                                        width: 30px;
                                    }
                                }
                            }
                        }
                    }

                    .video-empty {

                        .empty {
                            width: 90px;
                            height: 90px;
                        }
                    }

                }
            }
        }

    }
</style>
