<template>
    <section class="play-container">

        <div v-if="video_type === 1" class="play-video-min">
            <iframe class="min" id="min" frameborder=0 name="min" scrolling=auto></iframe>
        </div>

        <div v-if="video_type === 2" class="play-video-max">
            <iframe class="max" id="max" frameborder=0 name="max" scrolling=auto></iframe>
        </div>

        <div class="video-info">
            <div class="video-info-details">
                <p>标题</p>
                <p>
                    <span>主持人：嘟嘟嘟</span>
                    <span>观看：3333</span>
                </p>
            </div>
            <div class="go-back">
                <p>返回</p>
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
                    const MIN = document.getElementById('min');
                    MIN.src = this.$route.query.video_url;
                    this.video_type = +res.back_value.status
                }

                if (+res.back_value.status === 2) {
                    const MAX = document.getElementById('max');
                    MAX.src = this.$route.query.video_url;
                    this.video_type = +res.back_value.status
                }

                if (+res.back_value.status === 3) {
                    // .mp4

                }

                this.$Toast.clear();
            })
        }
    }
</script>

<style lang="less" scoped>
    .play-container {

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
            border: 1px solid red;
            display: grid;
            grid-template-columns: 3fr 1fr;

            div {
                border: 1px solid black;
            }

            .video-info-details {

                p {

                    &:nth-of-type(1) {
                        font-size: 26px;
                        color: #17233d;
                    }

                    &:nth-of-type(2) {
                        font-size: 24px;
                        color: #515a6e;
                    }
                }
            }

            .go-back {

            }
        }
    }
</style>