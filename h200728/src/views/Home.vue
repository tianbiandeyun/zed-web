<template>
    <section class="home-container">
        <!--<alert></alert>-->
        <button @click="go">click me</button>
    </section>
</template>

<script>
    // import alert from '../components/alert/alert'

    export default {
        name: 'Home',
        components: {},
        methods: {
            go() {
                this.$Alert.show({
                    title: '签到成功',
                    confirmText: '前往领奖'
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>