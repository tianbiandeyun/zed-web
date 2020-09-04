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
            <Tab title="标签 1">

                <Swiper></Swiper>

                <div class="office-list">
                    <OfficItem></OfficItem>
                </div>

            </Tab>
            <Tab title="标签 2">

                <Swiper></Swiper>

                <div class="office-list">
                    <OfficItem></OfficItem>
                </div>

            </Tab>
            <Tab title="标签 3">

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

    export default {
        name: 'Home',
        components: {Tab, Tabs, Tabbar, TabbarItem, Swiper, OfficItem},
        data() {
            return {
                active: 0
            }
        },
        mounted() {
            this.$Utils.setDocumentTitle('高成名就')
        },
        methods: {
            /**
             * 选项卡
             * */
            onTabClick(index) {
                console.log(index);
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
        },
    }
</script>
<style lang="less" scoped>
    .home-container {
        height: 100%;
        overflow-y: scroll;
        background-color: @default-app-color-background;
    }
</style>
