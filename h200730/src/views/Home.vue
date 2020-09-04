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
                <section class="tab-first">

                    <Swiper></Swiper>

                    <div class="office-list">
                        <OfficItem></OfficItem>
                    </div>

                </section>
            </Tab>
            <Tab title="标签 2">内容 2</Tab>
            <Tab title="标签 3">内容 3</Tab>
        </Tabs>

        <!--底部导航-->
        <Tabbar
                v-model="active"
                active-color="#ff9900"
                inactive-color="#515a6e"
                @change="onTabbarClick">
            <TabbarItem icon="home-o">标签1</TabbarItem>
            <TabbarItem icon="search">标签2</TabbarItem>
            <TabbarItem icon="friends-o">标签3</TabbarItem>
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
            },
        },
    }
</script>
<style lang="less" scoped>
    .home-container {
        height: 100%;
        overflow-y: scroll;
        background-color: @default-app-color-background;

        .tab-first {

            .office-list {

            }

        }

    }
</style>
