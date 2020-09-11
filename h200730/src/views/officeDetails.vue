<template>
    <section class="office-details-container">

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "officeDetails",
        mounted() {
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_job_info,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                    job_info_id: res.id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                console.log(res);
            });
        },
        computed: {
            ...mapGetters([
                'openid_info'
            ])
        }
    }
</script>

<style lang="less" scoped>

</style>