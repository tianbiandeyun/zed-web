<template>
    <section class="home">

        <!--头-->
        <c-header></c-header>

        <!--左侧导航-->
        <c-menuLeft @menuLeftIndex="listerMenuLeftIndex"></c-menuLeft>

        <!--显示区域-->
        <c-main></c-main>

    </section>
</template>

<script>
    import cHeader from '../components/header/headerComponent'
    import cMenuLeft from '../components/menuLeft/menuLeftComponent'
    import cMain from '../components/main/mainComponent'

    export default {
        name: 'home',
        components: {cHeader, cMenuLeft, cMain},
        methods: {
            /**
             * 监听侧边栏选择的是第几个栏目
             * 用于显示在 c-main 中的子路由中
             * */
            async listerMenuLeftIndex(parmes) {
                const that = this;
                switch (parmes.menuLeftIndex) {
                    case 0:
                        that.$router.push({name: 'summay'});
                        break;
                    case 1:
                        that.$router.push({name: 'review', params: {menuLeftIndex: parmes.menuLeftIndex}});
                        break;
                    case 2:
                        that.$router.push({name: 'operating', params: {menuLeftIndex: parmes.menuLeftIndex}});
                        break;
                    default:
                }
            }
        }
    }
</script>

<style lang="less">
    .home {
        height: 100%;
    }
</style>
