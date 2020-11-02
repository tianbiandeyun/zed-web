<template>
    <section class="office-details-container">

        <OfficItem :office="office_details">
            <p class="position">发布时间：{{office_details.issuance_date}}</p>
        </OfficItem>

        <transition name="effect">
            <div v-show="+is_office_send === 1 || office_send_result === 1">
                <div class="office">
                    <p class="title">职位描述：</p>
                    <p class="content" v-for="(item,index) in office_details.job_describe" :key="index">
                        {{item}}
                    </p>
                </div>

                <div class="office">
                    <p class="title">任职条件：</p>
                    <p class="content" v-for="(item,index) in office_details.skill_requirements" :key="index">
                        {{item}}
                    </p>
                </div>
                <div class="save-box">
                    <button class="save" v-if="+is_office_send === 1" @click="sendOffice(office_details)">简历直投</button>
                    <button class="save" v-else @click="seeOfficeResult">
                        {{+office_send_result === 1 ? '查看投递结果' : '查看职位详情'}}
                    </button>
                </div>
                <div v-if="is_go_home" class="position-go-home" @click="goHome">查看更多职位</div>
            </div>
        </transition>

        <transition name="effect">
            <div v-show="+is_office_send === 2 && office_send_result === 2">
                <div class="office">
                    <p class="title">简历送达：</p>
                    <p class="content">{{office_details.recruitment_unit}}</p>
                </div>
                <div class="office">
                    <p class="title">阅读状态：</p>
                    <p class="content">
                        <span :class="{span_active: +office_details.read_status === 1}">未读</span> |
                        <span :class="{span_active: +office_details.read_status === 2}">已读</span> |
                        <span :class="{span_active: +office_details.read_status === 3}">不合适</span>
                    </p>
                </div>
                <div class="save-box">
                    <button class="save" v-if="+is_office_send === 1" @click="sendOffice(office_details)">简历直投</button>
                    <button class="save" v-else @click="seeOfficeResult">
                        {{+office_send_result === 1 ? '查看投递结果' : '查看职位详情'}}
                    </button>
                </div>
                <div v-if="is_go_home" class="position-go-home" @click="goHome">查看更多职位</div>
            </div>
        </transition>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import OfficItem from '../components/officeItem/office_item'

    export default {
        name: "officeDetails",
        components: {OfficItem},
        data() {
            return {
                office_details: {},
                // 1 没有投递 2 是投递过
                is_office_send: 1,
                // 1 查看投递结果 2 职位详情
                office_send_result: 1,
                data: '',
                is_go_home: false
            }
        },
        async mounted() {

            this.$Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });

            // 获取 职位ID 和 userID
            this.data = await this.init();

            // 获取职位详情
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_job_info,
                fps: {
                    open_id: this.data.openid,
                    job_info_id: this.data.task_id
                },
                url: this.$Config.REQUEST_URL
            }).then(async res => {
                this.is_office_send = res.back_value.status;
                this.office_details = res.back_value;

                // 设置页面title
                this.$Utils.setDocumentTitle(res.back_value.job_title);

                // 如果是从我的投递进去的则显示，投递结果
                if (this.$route.query.page === 'yt') {
                    this.office_send_result = 2;
                }

                // 微信分享
                new this.$WxShare(this.wx_config.back_value, {
                    title: `${res.back_value.job_title}`,
                    details: '有钱不赚，王八蛋！',
                    link: `${this.$Config.PROJECT_SHARE_REQUEST}/h/${this.$Config.PROJECT_ID}/dist/index.html?ac=hxdf&id=${this.data.task_id}&openid=${this.data.openid}&state=507058&i_rs=t_code&i_t=1603164816&i_sn=6f2852a63bb772e39cf59dadabe3a3cd#/officeDetails`,
                    image: this.$Config.PROJECT_SHARE_REQUEST + '/h/' + this.$Config.PROJECT_ID + '/dist/share.png'
                }, false).init();

                this.$Toast.clear();
            });
        },
        methods: {
            /**
             * 回到首页
             * */
            goHome() {
                window.location.replace(`${this.$Config.PROJECT_REQUEST}?r=interface/anycall&k=h_200730&page=dist/index&ac=hxdf&base=0`)
            },
            /**
             * 切换查看简历投递进度和职位详情
             **/
            seeOfficeResult() {
                this.office_send_result = this.office_send_result === 1 ? 2 : 1;
            },
            /**
             * 投递简历
             **/
            sendOffice(office_details) {
                const that = this;

                if (this.resume_info.back_value.length === 0) {

                    this.$Alert.show({
                        title: '提示',
                        alertContent: '暂无个人信息，是否添加？',
                        yesText: '添加',
                        noText: '取消',
                        yes() {
                            that.$router.push(`/basic?jobid=${office_details.id}`);
                        }
                    });

                    return false;
                }

                that.$router.push(`/uploader?jobid=${office_details.id}`);

                // this.$Alert.show({
                //     title: '确认提交简历',
                //     alertContent: '简历将提交给第三方人力资源部门进行审阅，确认后不可撤回',
                //     yes() {
                //         that.$router.push(`/uploader?jobid=${office_details.id}`);
                //     }
                // });

            },
            async init() {
                if (this.$Utils.getUrlParam('id') && this.$Utils.getUrlParam('openid')) {
                    await this.$store.dispatch('getWxConfig', {
                        im: this.$Config.PROJECT_INTERFACE.get_jsconf,
                        fps: {
                            url: encodeURIComponent(window.location.href.split('#')[0])
                        },
                        url: this.$Config.REQUEST_URL
                    });
                    this.is_go_home = true;
                    return {
                        task_id: this.$Utils.getUrlParam('id'),
                        openid: this.$Utils.getUrlParam('openid')
                    }
                } else {
                    this.is_go_home = false;
                    return {
                        task_id: this.$route.query.id,
                        openid: this.$route.query.openid
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'wx_config',
                'resume_info'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .office-details-container {

        .effect-enter, .effect-leave-to {
            opacity: 0;
            transform: translateX(-100%);
        }

        .effect-enter-active, .effect-leave-active, .effect-move {
            transition: all .3s ease-in-out;
        }

        .effect-enter-active, .effect-leave-active {
            position: absolute;
        }

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

                .span_active {
                    color: @default-app-color-primary;
                }
            }
        }

        .save-box {
            width: 100%;
            text-align: center;
            padding-top: 40px;
            padding-bottom: 10px;

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

        .position-go-home {
            text-decoration: underline;
            text-align: center;
            padding-top: 30px;
            color: @default-font-color-sub;
        }
    }
</style>