<template>
    <section class="home-container">

        <button @click="go">click me</button>

    </section>
</template>

<script>

    export default {
        name: 'Home',
        components: {},
        methods: {
            go() {

                this.$Alert.show()

            }
        }
    }
</script>

<style lang="less" scoped>

</style>