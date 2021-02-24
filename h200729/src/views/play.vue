<template>
    <section class="play-container">

        <div v-if="video_type === 1" class="play-video-min">
            <iframe class="min" id="min" frameborder=0 name="min" scrolling=auto></iframe>
        </div>

        <div v-if="video_type === 2" class="play-video-max">
            <iframe class="max" id="max" frameborder=0 name="max" scrolling=auto></iframe>
        </div>

        <div v-if="video_type === 3" class="video-mp4">
            <video
                    controls
                    :src="video_url">
            </video>
        </div>

        <div class="video-info">
            <div class="video-info-details">
                <p>{{video_info.title}}</p>
                <p>
                    <span>主持人：{{video_info.name}}</span>
                    <span>观看人数：{{video_info.click_count}}</span>
                </p>
            </div>
            <div class="go-back">
                <p>返回首页</p>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "play",
        data() {
            return {
                video_type: 1,
                video_info: '',
                video_url: ''
            }
        },
        mounted() {

            this.$Toast.loading({
                message: '加载中...',
                duration: 0,
                forbidClick: true,
            });

            // 视频详情
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_video_info,
                fps: {
                    video_id: this.$route.query.video_id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {

                this.video_info = res.back_value;

                console.log(res.back_value);

                if (+res.back_value.status === 1) {
                    this.video_type = +res.back_value.status;
                    const MIN = document.getElementById('min');
                    MIN.src = this.$route.query.video_url;
                }

                if (+res.back_value.status === 2) {
                    this.video_type = +res.back_value.status;
                    const MAX = document.getElementById('max');
                    MAX.src = this.$route.query.video_url;
                }

                if (+res.back_value.status === 3) {
                    this.video_type = +res.back_value.status;
                    this.video_url = this.$route.query.video_url;
                }

                this.$Toast.clear();
            })
        }
    }
</script>

<style lang="less" scoped>
    .play-container {
        background-color: #e8eaec;

        .play-video-max {
            width: 100%;
            height: 380px;
            overflow: hidden;

            .max {
                width: 100%;
                height: 900px;
                transform: translateY(-119px);
            }
        }

        .video-mp4 {
            border: 1px solid black;

            video {
                width: 100%;
            }
        }

        .play-video-min {
            width: 100%;
            height: 380px;
            overflow: hidden;
            background-color: #fff;
            border-bottom: 1px solid black;

            .min {
                width: 100%;
                height: 700px;
                transform: translateY(-231px);
            }
        }

        .video-info {
            background-color: #fff;
            display: grid;
            grid-template-columns: 2.2fr 1fr;
            grid-column-gap: 10px;
            border: 1px solid black;
            padding: 20px 40px;
            margin-bottom: 20px;

            .video-info-details {

                p {

                    line-height: 1.4;

                    &:nth-of-type(1) {
                        font-size: 34px;
                        color: #17233d;
                        margin-bottom: 10px;
                    }

                    &:nth-of-type(2) {
                        font-size: 26px;
                        color: #515a6e;
                        display: grid;
                        grid-template-columns: 1fr 1fr;

                        span {

                            &:nth-of-type(2) {
                                text-align: right;
                            }
                        }
                    }
                }
            }

            .go-back {
                display: grid;
                align-items: center;
                justify-items: center;

                p {
                    border: 4px solid #dcdee2;
                    padding: 14px 30px;
                    font-size: 24px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    color: #515a6e;
                }
            }
        }
    }
</style>