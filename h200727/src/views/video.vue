<template>
    <section class="video-container">

        <iframe id="show-iframe"
                :width="width"
                :height="height"
                :src="src"
                frameborder=0
                name="showHere"
                scrolling=auto>
        </iframe>

    </section>
</template>

<script>
    export default {
        name: "video-container",
        data() {
            return {
                width: '',
                height: '',
                src: ''
            }
        },
        mounted() {
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            this.width = deviceWidth;
            this.height = deviceHeight;
            this.src = this.$route.query.video_url;

            console.log(this.$route.query.video_url);
            console.log(this.$route.query.video_id);
            console.log(this.$route.query.type);
            console.log(this.$route.query.qr);

        }
    }
</script>

<style lang="less" scoped>

</style>