<template>
    <section class="search-container">

        <div class="search-title">
            <p>{{title}}</p>
        </div>

        <div class="video-list">
            <div class="video-item"
                 v-for="(item,index) in video_list"
                 :key="index"
                 @click="playVideo(item)"
            >
                <div class="video-item-left">
                    <img :src="item.video_img" :alt="item.name">
                </div>
                <div class="video-item-right">
                    <p>{{item.title}}</p>
                    <p>主讲人：{{item.name}}</p>
                    <p>播放：{{item.click_count}}</p>
                </div>
            </div>
        </div>

        <div class="go-back" @click="goBack">返回首页</div>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "search",
        data() {
            return {
                title: '',
                video_list: []
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

            // 视频列表
            await this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_curriculum_video_list,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                    video_grouping_id: this.$route.query.search_id,
                    start: 0,
                    end: 100
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.title = this.$route.query.title;
                this.video_list = res.back_value;
            });

            this.$Toast.clear();

        },
        methods:{
            playVideo(res){
                this.$router.push(`/play?video_url=${res.video_url}&video_id=${res.id}`)
            },
            goBack() {
                this.$router.replace(`/`)
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
    .search-container{
        background-color: #e8eaec;
        padding-bottom: 120px;

        .search-title{
            background-color: #fff;
            margin-bottom: 20px;
            padding: 60px 40px;
            font-size: 34px;
            color: #17233d;
            text-align: center;
            font-weight: 600;
        }

        .video-list{

            .video-item{
                padding: 20px 40px;
                background-color: #fff;
                display: grid;
                grid-template-columns: 1.3fr 2fr;
                grid-column-gap: 20px;
                margin-bottom: 20px;

                .video-item-left{
                    font-size: 0;
                    box-shadow: 0px 0px 5px 5px rgb(220,215,215);
                    -webkit-box-shadow: 0px 0px 5px 5px rgb(220,215,215);
                    -moz-box-shadow: 0px 0px 5px 5px rgb(220,215,215);

                    img {
                        width: 100%;
                    }
                }

                .video-item-right{
                    display: grid;
                    align-items: center;

                    p{
                        font-size: 24px;
                        color: #515a6e;

                        &:nth-of-type(1){
                            font-size: 28px;
                            color: #17233d;
                        }
                    }
                }
            }
        }

        .go-back{
            background-color: #fff;
            padding: 40px;
            text-align: center;
            font-size: 30px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: #515a6e;
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            box-shadow: -1px -5px 5px 0px rgb(220,215,215);
            -webkit-box-shadow: -1px -5px 5px 0px rgb(220,215,215);
            -moz-box-shadow: -1px -5px 5px 0px rgb(220,215,215);
        }
    }
</style>