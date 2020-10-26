<template>
    <div id="app">
        <transition name="effect">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "",
        mounted() {
            this.$Utils.setDocumentTitle('十一送祝福');

            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_jsconf,
                fps: {
                    url: encodeURIComponent(window.location.href.split('#')[0])
                },
                url: this.$Config.REQUEST_URL
            }).then(async res => {

                new this.$WxShare(res.back_value, {
                    title: '金秋贺国庆',
                    details: '中秋的国庆节怎样送祝福才能惊艳？',
                    link: await this.$Utils.makeShareLink(),
                    image: this.$Config.PROJECT_SHARE_REQUEST + '/h/' + this.$Config.PROJECT_ID + '/dist/share.png'
                }, false).init();

            });

        }
    }
</script>

<style lang="less" scoped>

    .effect-enter, .effect-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }

    .effect-enter-active, .effect-leave-active {
        transition: all .3s ease-in-out;
    }

</style>
