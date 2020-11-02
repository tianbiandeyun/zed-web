<template>
    <div id="app">
        <!--音乐组件-->
        <playmp3 v-if="isPlay"></playmp3>
        <!--路由-->
        <transition :name="animate">
            <router-view id="view"></router-view>
        </transition>
    </div>
</template>

<script>
    import playmp3 from '../src/components/palymp3/playmp3'

    export default {
        name: 'app',
        components: {playmp3},
        data() {
            return {
                animate: '',
                isPlay: true
            }
        },
        methods: {},
        watch: {
            $route(to, from) {
                let that = this;
                if ('/result' === to.path) {
                    that.isPlay = false
                }
                /**
                 * 如果从答题页到结果页，就不显示音乐组件
                 * */
                if ('/question' === from.path) {
                    that.isPlay = false
                }
                /**
                 * 从结果页点击再来一次，就显示音乐组件
                 * */
                if ('/result' === from.path) {
                    that.isPlay = true
                }
                let slide = to.meta.slide;
                that.animate = slide === 1 ? 'slide-left' : 'slide-right'
            }
        }
    }
</script>

<style lang="less">
    /*第三方字体样式*/
    @import "../src/assets/css/font.css";

    #app {
        width: 100%;
        height: 100%;
        background-color: #000;

        #view {
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        }

        .slide-left-enter,
        .slide-right-leave-active {
            opacity: 0;
            transform: translate(100%, 0);
        }

        .slide-left-leave-active,
        .slide-right-enter {
            opacity: 0;
            transform: translate(-100%, 0);
        }

        .slide-top-enter,
        .slide-bottom-leave-active {
            opacity: 0;
            transform: translate(0, 100%);
        }

        .slide-top-leave-active,
        .slide-bottom-enter {
            opacity: 0;
            transform: translate(0, -100%);
        }
    }

</style>
