<template>
    <section class="office-details-container">

        <OfficItem :office="office_details">
            <p class="position">发布时间：{{office_details.issuance_date}}</p>
        </OfficItem>

        <div class="office">
            <p class="title">职位描述：</p>
            <p class="content">{{office_details.describe }}</p>
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

        <div class="save-box">
            <button class="save" @click="sendOffice">简历直投</button>
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
                this.office_details = res.back_value;
            });
        },
        methods: {
            sendOffice() {
                this.$Alert.show({
                    title: '确认提交简历',
                    alertContent: '简历将提交给第三方人力资源部门进行审阅，确认后不可撤回',
                    yes() {
                        console.log('yes')
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