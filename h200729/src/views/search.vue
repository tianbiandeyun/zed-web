<template>
    <section class="search-container">
        <div>
            <p>{{title}}</p>
        </div>
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
        computed: {
            ...mapGetters([
                "openid_info"
            ])
        }
    }
</script>

<style lang="less" scoped>

</style>