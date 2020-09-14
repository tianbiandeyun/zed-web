<template>
    <section class="office-details-container">

        <OfficItem :office="office_details">
            <p class="position">发布时间：{{office_details.issuance_date}}</p>
        </OfficItem>

        <div v-show="+office_details.status === 1">
            <div class="office">
                <p class="title">职位描述：</p>
                <p class="content">{{office_details.describe}}</p>
            </div>

            <div class="office">
                <p class="title">技能要求：</p>
                <p class="content" v-for="(item,index) in office_details.skill_requirements" :key="index">
                    {{index+1}}、{{item}}
                </p>
            </div>

            <div class="office">
                <p class="title">岗位职责：</p>
                <p class="content" v-for="(item,index) in office_details.job_describe" :key="index">
                    {{index+1}}、{{item}}
                </p>
            </div>
        </div>

        <div v-show="+office_details.status === 2">
            <div class="office">
                <p class="title">简历送达：</p>
                <p class="content">333333</p>
            </div>
            <div class="office">
                <p class="title">阅读状态：</p>
                <p class="content">
                    <span>未读</span> |
                    <span>已读</span> |
                    <span>不合适</span>
                </p>
            </div>
        </div>

        <div class="save-box">
            <button class="save" @click="sendOffice(office_details)">
                {{+office_details.status === 1 ? '简历直投' : '职位详情'}}
            </button>
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
                // res.back_value.status 1 没有投递 2 是投递过
                this.office_details = res.back_value;
            });
        },
        methods: {
            sendOffice(office_details) {
                const that = this;

                this.$Alert.show({
                    title: '确认提交简历',
                    alertContent: '简历将提交给第三方人力资源部门进行审阅，确认后不可撤回',
                    yes() {
                        that.$store.dispatch('fetchData', {
                            im: that.$Config.PROJECT_INTERFACE.set_application_record,
                            fps: {
                                open_id: that.openid_info.back_value.open_id,
                                company_id: office_details.company_id,
                                job_info_id: office_details.id
                            },
                            url: that.$Config.REQUEST_URL
                        }).then(res => {
                            if (res.back_value) {
                                that.$store.dispatch('fetchData', {
                                    im: that.$Config.PROJECT_INTERFACE.get_job_info,
                                    fps: {
                                        open_id: that.openid_info.back_value.open_id,
                                        job_info_id: that.$route.query.id
                                    },
                                    url: that.$Config.REQUEST_URL
                                }).then(res => {
                                    // res.back_value.status 1 没有投递 2 是投递过
                                    that.office_details = res.back_value;
                                });
                            }
                        })
                    },
                    no() {
                        console.log('no')
                    }
                });
            }
        },
        computed: {
            ...mapGetters([
                'openid_info'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .office-details-container {

        .office {
            padding: 10px 40px;

            .title {
                font-size: @default-font-size-34;
                color: @default-font-color-content;
                line-height: 2;
            }

            .content {
                font-size: @default-font-size-26;
                line-height: 1.4;
                color: @default-font-color-sub;
            }
        }

        .save-box {
            width: 100%;
            text-align: center;
            padding-top: 40px;
            padding-bottom: 80px;

            .save {
                font-size: @default-font-size-30;
                background-color: @default-app-color-primary;
                color: #fff;
                padding: 20px 40px;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
            }
        }
    }
</style>