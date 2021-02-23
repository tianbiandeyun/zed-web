<template>
    <section class="index-container">

        <div class="index-swipe">
            <Swipe class="swipe"
                   :autoplay="3000"
                   indicator-color="white"
            >
                <SwipeItem v-for="(image, index) in swipe_list" :key="index">
                    <img :src="image.video_img" :alt="image.title">
                </SwipeItem>
            </Swipe>
        </div>

        <div class="index-tabs">
            <Tabs v-model="active"
                  color="#ff9900"
                  title-active-color="#17233d"
                  title-inactive-color="#515a6e"
                  @click="clickTab"
            >
                <Tab v-for="(item, index) in tab_list"
                     :key="index"
                     :title="item.name"
                     :name="item.id"
                     class="tab">

                    <div class="video-list">

                        <div class="video-item"
                             v-for="(item,index) in video_list"
                             :key="index"
                        >
                            <div class="video-item-img">
                                <img :src="item.video_img" :alt="item.name">
                            </div>
                            <div class="video-item-details">
                                <p>{{item.title}}</p>
                                <p>
                                    <span>主持人：{{item.name}}</span>
                                    <span>播放量：{{item.click_count}}</span>
                                </p>
                            </div>
                        </div>

                    </div>

                </Tab>
            </Tabs>
        </div>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Swipe, SwipeItem, Tab, Tabs} from 'vant';

    export default {
        name: 'Home',
        components: {Swipe, SwipeItem, Tab, Tabs},
        data() {
            return {
                swipe_list: [],
                tab_list: [],
                video_list:[],
                active: 0,
            }
        },
        async mounted() {

            // 如果 openid 是空，则获取
            if (this.openid_info === '') {
                await this.$store.dispatch('getOpenid', {
                    im: this.$Config.PROJECT_INTERFACE.getopenid,
                    url: this.$Config.REQUEST_URL
                });
            }

            // 轮播图
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_banner,
                fps: {
                    page_name: '青听学院',
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.swipe_list = res.back_value;
            });

            // tab
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_video_grouping,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.tab_list = res.back_value;
            });

            // 视频列表
            this.$store.dispatch('fetchData', {
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
                console.log(res.back_value)
            })

        },
        methods: {
            clickTab(name) {
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
                    this.video_list = res.back_value;
                    console.log(res.back_value);
                })
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
        border: 1px solid black;
        padding: 20px 40px;

        .index-swipe {
            border: 1px solid black;
            margin-bottom: 20px;

            .swipe .van-swipe-item {
                height: 230px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .index-tabs {
            border: 1px solid black;
            margin-bottom: 20px;

            .tabs {
                font-size: 60px;
            }

            .tab {
                border: 1px solid red;

                .video-list{
                    border: 1px solid black;
                    padding: 20px 0;
                    display: grid;
                    grid-template-columns: repeat(2,1fr);
                    grid-column-gap: 20px;
                    grid-row-gap: 20px;

                    .video-item{
                        border: 1px solid black;
                    }
                }
            }
        }

    }
</style>
