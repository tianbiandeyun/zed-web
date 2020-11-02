<template>
  <div id="app">
    <!--路由-->
    <transition :name="animate">
      <router-view id="view" v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>

<script>

    export default {
        name: 'app',
        components: {},
        data() {
            return {
                animate: '',
                isRouterAlive: true
            }
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        methods: {
            reload() {
                const that = this;
                that.isRouterAlive = false;
                that.$nextTick(() => {
                    that.isRouterAlive = true
                })
            }
        },
        watch: {
            $route(to) {
                let that = this;
                let slide = to.meta.slide;
                that.animate = slide === 1 ? 'slide-left' : 'slide-right';
            }
        }
    }
</script>

<style lang="less">

  #app {
    width: 100%;
    height: 100%;

    #view {
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
