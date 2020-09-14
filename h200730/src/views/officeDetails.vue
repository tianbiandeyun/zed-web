<template>
    <section class="office-details-container">

        <OfficItem :office="office_details">
            <p class="position">发布时间：{{office_details.issuance_date}}</p>
        </OfficItem>

        <div>
            <h2>职位描述：</h2>
            <p>{{office_details.job_describe }}</p>
        </div>

        <div>
            <h2>技能要求：</h2>
            <p>{{office_details.skill_requirements }}</p>
        </div>

        <div>
            <h2>岗位职责：</h2>
            <p>{{office_details.describe }}</p>
        </div>

    </section>
</template>

<script>
    import OfficItem from '../components/officeItem/office_item'
    import {mapGetters} from 'vuex'

    export default {
        name: "officeDetails",
        components: {OfficItem},
        data() {
            return {
                office_details: {}
            }
        },
        mounted() {
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_job_info,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                    job_info_id: this.$route.query.id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                console.log(res.back_value)
                this.office_details = res.back_value;
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