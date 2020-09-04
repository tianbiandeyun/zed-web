<template>
    <section class="send-office-container">
        <OfficItem>
            <p>发布日期：2020-0-13</p>
        </OfficItem>
    </section>
</template>

<script>
    import OfficItem from '../components/officeItem/office_item'

    export default {
        name: "sendOffice",
        components: {OfficItem}
    }
</script>

<style lang="less" scoped>
    .send-office-container {
        height: 100%;
        overflow-y: scroll;
        background-color: @default-app-color-background;
    }

</style>