<template>
    <section class="playmp3">
        <img v-if="isPlayMusic" src="../../assets/images/index/play.png" @click="changeOn" alt="">
        <img v-else src="../../assets/images/index/stopplay.png" @click="changeOn" alt="">
        <!--音乐-->
        <audio ref="audio" :src="require('../../assets/mp3/r.mp3')"></audio>
    </section>
</template>

<script>

    import {mapGetters} from 'vuex'

    export default {
        name: "playmp3",
        data() {
            return {}
        },
        mounted() {
            let that = this;
            /**
             * 安卓打开直接播放
             * */
            that.audioAutoPlay();
            /**
             * 自动播放音乐效果，解决微信自动播放问题
             * */
            document.addEventListener('WeixinJSBridgeReady', that.audioAutoPlay, false);
            /**
             * 播放完毕，重新循环播放
             * */
            that.$refs.audio.onended = function () {
                that.$refs.audio.load();
                that.$refs.audio.play();
            }
        },
        methods: {
            changeOn() {
                let that = this;
                if (that.isPlayMusic) {
                    /**
                     * 暂停播放
                     * */
                    that.$refs.audio.pause();
                } else {
                    /**
                     * 开始播放
                     * */
                    that.$refs.audio.play();
                }
                that.$store.dispatch('setPlayMusic', {is: !that.isPlayMusic});
            },
            audioAutoPlay() {
                let that = this;
                that.$store.dispatch('setPlayMusic', {is: true});
                that.$refs.audio.play();
            }
        },
        computed: {
            ...mapGetters([
                'isPlayMusic'
            ])
        }
    }
</script>

<style lang="less">
    .playmp3 {
        position: fixed;
        z-index: 9;
        right: 40px;
        top: 20px;

        img {
            width: 60px;
        }
    }
</style>
