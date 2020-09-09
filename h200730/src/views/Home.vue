<template>
    <section class="home-container">

        <!--选项卡-->
        <Tabs
                sticky
                animated
                color="#ff9900"
                title-inactive-color="#515a6e"
                title-active-color="#17233d"
                @click="onTabClick">

            <Tab
                    :title="item.company_name"
                    :name="item.id"
                    v-for="(item,index) in company_list" :key="index">

                <Swiper></Swiper>
                <div class="office-list">
                    <OfficItem></OfficItem>
                </div>

            </Tab>

        </Tabs>

        <!--底部导航-->
        <Tabbar
                v-model="active"
                active-color="#ff9900"
                inactive-color="#515a6e"
                safe-area-inset-bottom
                @change="onTabbarClick">
            <TabbarItem icon="home-o">职位</TabbarItem>
            <TabbarItem icon="search">我的投递</TabbarItem>
            <TabbarItem icon="friends-o">简历</TabbarItem>
        </Tabbar>

    </section>
</template>

<script>
    import Swiper from '../components/swiper/swiper';
    import OfficItem from '../components/officeItem/office_item'
    import {Tab, Tabs, Tabbar, TabbarItem} from 'vant';
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        components: {Tab, Tabs, Tabbar, TabbarItem, Swiper, OfficItem},
        data() {
            return {
                active: 0,
                company_list: []
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

            await this.$store.dispatch('getOpenid', {
                im: this.$Config.PROJECT_INTERFACE.getopenid,
                url: this.$Config.REQUEST_URL
            });

            this.refresh();

        },
        methods: {
            /**
             * 选项卡
             * */
            onTabClick(name, title) {
                console.log(name);
            },
            /**
             * 底部导航
             * */
            onTabbarClick(index) {
                console.log(index);
                if (index === 1) {
                    this.$router.push('/sendOffice')
                }
            },
            refresh() {

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_user_resume,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    if (res.back_value.length === 0) {
                        this.$Toast.clear();
                        this.$router.replace('/basic')
                    } else {
                        return this.$store.dispatch('fetchData', {
                            im: this.$Config.PROJECT_INTERFACE.get_company_list,
                            fps: {
                                open_id: this.openid_info.back_value.open_id
                            },
                            url: this.$Config.REQUEST_URL
                        })
                    }
                }).then(res => {
                    this.$Toast.clear();
                    this.company_list = res.back_value;
                })

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
    .home-container {
        height: 100%;
        overflow-y: scroll;
        background-color: @default-app-color-background;
    }
</style>
