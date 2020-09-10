<template>
    <section class="send-office-container">

        <div v-if="office_list.length !== 0">
            <OfficItem v-for="(item,index) in office_list" :key="index" :office="item">
                <p>{{item.recruitment_unit}}</p>
            </OfficItem>
        </div>
        <div class="air" v-else>
            暂时没投递任何职位
        </div>

    </section>
</template>

<script>
    import OfficItem from '../components/officeItem/office_item'
    import {mapGetters} from 'vuex'

    export default {
        name: "sendOffice",
        components: {OfficItem},
        data() {
            return {
                office_list: []
            }
        },
        mounted() {

            this.$Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });

            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_application_record,
                fps: {
                    open_id: this.openid_info.back_value.open_id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.$Toast.clear();
                console.log(res.back_value);
                this.office_list = res.back_value;
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
    .send-office-container {
        height: 100%;
        overflow-y: scroll;
        background-color: @default-app-color-background;

        .air {
            text-align: center;
            font-size: @default-font-size-46;
            color: @default-font-color-sub;
            line-height: 2;
        }
    }

</style>