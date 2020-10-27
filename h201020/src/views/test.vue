<template>
    <div class="pullup">
        <div ref="scroll" class="pullup-wrapper">
            <div class="pullup-content">
                <ul class="pullup-list">
                    <li v-for="i of data" :key="i" class="pullup-list-item">
                        {{ i % 5 === 0 ? 'scroll up 👆🏻' : `I am item ${i} `}}
                    </li>
                </ul>
                <div class="pullup-tips">
                    <div v-if="!isPullUpLoad" class="before-trigger">
                        <span class="pullup-txt">Pull up and load more</span>
                    </div>
                    <div v-else class="after-trigger">
                        <span class="pullup-txt">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import Pullup from '@better-scroll/pull-up'

    BScroll.use(Pullup)

    export default {
        data() {
            return {
                isPullUpLoad: false,
                data: [1, 2, 3, 4, 5]
            }
        },
        mounted() {
            this.initBscroll()
        },
        methods: {
            initBscroll() {
                this.bscroll = new BScroll(this.$refs.scroll, {
                    pullUpLoad: {
                        threshold: -50
                    }
                })

                this.bscroll.on('pullingUp', this.pullingUpHandler)
            },
            async pullingUpHandler() {
                this.isPullUpLoad = true

                await this.requestData()

                this.bscroll.finishPullUp()
                this.bscroll.refresh()
                this.isPullUpLoad = false
            },
            async requestData() {
                const newData = await this.ajaxGet(/* url */)
                this.data = [...this.data, ...newData.back_value]
            },
            ajaxGet(/* url */) {
                return this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_wjj_article_list,
                    fps: {
                        open_id: '1',
                        page: 1,
                        channel_id: 1094
                    },
                    url: this.$Config.REQUEST_URL
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .pullup {
        height: 100%;

        .pullup-wrapper {
            height: 100%;
            padding: 0 10px;
            border: 1px solid #ccc;
            overflow: hidden;
        }

        .pullup-list {
            padding: 0
        }

        .pullup-list-item {
            padding: 10px 0;
            list-style: none;
            border-bottom: 1px solid #ccc;
        }

        .pullup-tips {
            padding: 20px;
            text-align: center;
            color: #999;
        }
    }

</style>