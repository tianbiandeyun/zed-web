<template>
    <section class="home-container">

        <Tabs
                sticky
                animated
                title-inactive-color="#515a6e"
                title-active-color="#17233d"
                @click="onClick">
            <Tab title="标签 1">

                <div style="height: 400px;border: 1px solid black;" v-for="item in 10" :key="index">
                    {{item}}
                </div>

            </Tab>
            <Tab title="标签 2">内容 2</Tab>
            <Tab title="标签 2">内容 2</Tab>
        </Tabs>


        <Tabbar
                v-model="active"
                active-color="#ff9900"
                inactive-color="#515a6e"
                @change="onChange">
            <TabbarItem icon="home-o">标签1</TabbarItem>
            <TabbarItem icon="search">标签2</TabbarItem>
            <TabbarItem icon="friends-o">标签3</TabbarItem>
        </Tabbar>

    </section>
</template>

<script>
    import {Tab, Tabs, Tabbar, TabbarItem, Notify, Toast} from 'vant';

    export default {
        name: 'Home',
        components: {Tab, Tabs, Tabbar, TabbarItem, Notify},
        data() {
            return {
                active: 0
            }
        },
        mounted() {
            this.$Utils.setDocumentTitle('高成名就')
        },
        methods: {
            onClick(name, title) {
                Toast(title);
            },
            onChange(index) {
                Notify({type: 'primary', message: index});
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
