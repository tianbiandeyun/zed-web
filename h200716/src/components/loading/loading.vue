<template>
    <section class="loading-container">
        <Overlay :show="show" z-index="2">
            <div class="loading-wrapper" @click="close">
                <Loading type="spinner" color="#fff" vertical>
                    <p class="loading-font-size">{{loadingMessage}}</p>
                </Loading>
            </div>
        </Overlay>
    </section>
</template>

<script>
    import {Overlay, Loading} from 'vant';

    export default {
        name: "wy_loading",
        components: {Overlay, Loading},
        props: {
            show: {
                type: Boolean,
                default: false
            },
            loadingMessage: {
                type: String,
                default: '加载中...'
            }
        },
        methods: {
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="less" scoped>
    .loading-wrapper {
        .default-flex(@jc:center,@ai:center);
        height: 100%;
    }
</style>