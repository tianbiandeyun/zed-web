<template>
    <section class="index-container">
        index-container
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        components: {},
        async mounted() {
            // 如果 openid 是空，则获取
            if (this.openid_info === '') {
                await this.$store.dispatch('getOpenid', {
                    im: this.$Config.PROJECT_INTERFACE.getopenid,
                    url: this.$Config.REQUEST_URL
                });
            }

            console.log(this.openid_info.back_value.open_id);

            // // 统计
            // this.$store.dispatch('fetchData', {
            //     im: this.$Config.PROJECT_INTERFACE.set_uv_pv_statistics,
            //     fps: {
            //         open_id: this.openid_info.back_value.open_id,
            //         info_key: '注册',
            //     },
            //     url: this.$Config.REQUEST_URL
            // });
        },
        computed: {
            ...mapGetters([
                "openid_info"
            ])
        }
    }
</script>
