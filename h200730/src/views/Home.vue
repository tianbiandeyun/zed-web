<template>
    <section class="home-container">

        <Banner :img="img"></Banner>

        <div v-if="office_list.length !== 0">
            <OfficItem
                    v-for="(item,index) in office_list" :key="index"
                    :office="item"
                    @details="details(item)">
                <p class="position">{{item.recruitment_unit}}</p>
                <template slot="hot">
                    <img v-if="index <= 2" class="hot" src="../assets/images/hot.png" alt="">
                </template>
            </OfficItem>
        </div>
        <div class="air" v-else>
            暂时没有发布任何职位
        </div>

        <!--底部导航-->
        <Tabbar
                v-model="active"
                active-color="#ff9900"
                inactive-color="#515a6e"
                safe-area-inset-bottom
                @change="onTabbarClick">
            <TabbarItem icon="pending-payment">职位</TabbarItem>
            <TabbarItem icon="contact">我的投递</TabbarItem>
            <TabbarItem icon="records">简历</TabbarItem>
        </Tabbar>

    </section>
</template>

<script>
    import Banner from '../components/banner/banner';
    import OfficItem from '../components/officeItem/office_item'
    import {Tab, Tabs, Tabbar, TabbarItem} from 'vant';
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        components: {Tab, Tabs, Tabbar, TabbarItem, Banner, OfficItem},
        data() {
            return {
                active: 0,
                company_list: [],
                img: '',
                office_list: []
            }
        },
        async mounted() {

            this.$Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });

            this.$Utils.setDocumentTitle('高成名就');

            // 获取 openid
            await this.$store.dispatch('getOpenid', {
                im: this.$Config.PROJECT_INTERFACE.getopenid,
                url: this.$Config.REQUEST_URL
            });

            // 请求数据
            await this.refresh();

            // 微信分享
            new this.$WxShare(this.wx_config.back_value, {
                title: '兼职&实习岗位',
                details: '"课后收入"轻松过万～',
                link: await this.$Utils.makeShareLink(),
                image: this.$Config.PROJECT_SHARE_REQUEST + '/h/' + this.$Config.PROJECT_ID + '/dist/share.png'
            }, false).init();

        },
        methods: {
            /**
             * 职位详情
             * */
            details(res) {
                this.$router.push(`/officeDetails?id=${res.id}&openid=${this.openid_info.back_value.open_id}`);
            },
            /**
             * 底部导航
             * */
            onTabbarClick(index) {
                if (index === 1) {
                    this.$router.push('/sendOffice')
                }
                if (index === 2) {
                    this.$router.push('/resume')
                }
            },
            async refresh() {

                // banner
                await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_banner,
                    fps: {
                        page_name: ''
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.img = res.back_value[0].img_url;
                });

                // 职位列表
                await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_company_job_info_list,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        company_id: ''
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.office_list = res.back_value;
                });

                // 获取 微信配置
                await this.$store.dispatch('getWxConfig', {
                    im: this.$Config.PROJECT_INTERFACE.get_jsconf,
                    fps: {
                        url: encodeURIComponent(window.location.href.split('#')[0])
                    },
                    url: this.$Config.REQUEST_URL
                });

                // 是否填写简历
                this.$store.dispatch('getSelfResume', {
                    im: this.$Config.PROJECT_INTERFACE.get_user_resume,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                });

                this.$Toast.clear();
            }
        },
        computed: {
            ...mapGetters([
                'openid_info',
                'wx_config'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .home-container {
        height: 100%;
        overflow-y: scroll;
        background-color: @default-app-color-background;
        padding-bottom: 160px;

        .air {
            text-align: center;
            font-size: @default-font-size-46;
            color: @default-font-color-sub;
            line-height: 2;
        }
    }
</style>
