<template>
    <section class="play-container">

        <div v-if="is_max" class="play-video-max">
            <iframe class="max" id="max" frameborder=0 name="max" scrolling=auto></iframe>
        </div>

        <div v-else class="play-video-min">
            <iframe class="min" id="min" frameborder=0 name="min" scrolling=auto></iframe>
        </div>

    </section>
</template>

<script>
    export default {
        name: "play",
        data() {
            return {
                is_max: false
            }
        },
        mounted() {

            // 视频详情
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_video_info,
                fps: {
                    video_id: this.$route.query.video_id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                if (+res.back_value.status === 2) {
                    const MAX = document.getElementById('max');
                    MAX.src = this.$route.query.video_url;
                    this.is_max = true
                } else {
                    const MIN = document.getElementById('min');
                    MIN.src = this.$route.query.video_url;
                    this.is_max = false
                }
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
            background-color: black;

            .min {
                width: 100%;
                height: 700px;
                transform: translateY(-230px);
            }
        }
    }
</style>