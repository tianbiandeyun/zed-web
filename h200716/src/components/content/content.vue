<template>
    <section class="main-content">

        <loading :show="show"></loading>

        <div class="content-none-data" v-if="content_list.length === 0">{{tip_message}}</div>

        <div class="content" v-else>
            <div class="content-item"
                 v-for="(item,index) in content_list"
                 :key="item.id"
                 @click="openUrl(item.datadetail.s_redirect_url)">
                <h1 class="content-item-title">{{index+1}}：{{item.datadetail.s_title}}</h1>
                <p class="content-item-date">
                    时间：{{item.datadetail.s_post_date}} 关键词：{{item.groupname}} 网址：{{item.domain}}
                </p>
                <p class="content-item-details">{{item.datadetail.s_content_desc}}</p>
            </div>
            <div class="content-more" @click="getMore">--- 点击加载更多 ---</div>
        </div>


    </section>
</template>

<script>
    import {Notify} from 'vant';

    export default {
        name: "content-container",
        components: {
            [Notify.Component.name]: Notify.Component,
        },
        props: {
            keyWord: String
        },
        data() {
            return {
                show: false,
                content_list: [],
                str: 0,
                end: 30,
                tip_message: '欢迎使用，请点击左侧关键词搜索'
            }
        },
        methods: {
            /**
             * 获取更多
             * */
            getMore() {
                this.str = this.str += this.end;
                this.refreshContent(this.str, this.end, this.keyWord)
            },
            /**
             * 打开外部链接
             * */
            openUrl(url) {
                window.open(url, "_blank");
            },
            async refreshContent(str, end, groupname) {
                this.show = true;

                await this.$store.dispatch("_getCrawler", {
                    im: this.$config.requestInterface.get_crawler_data_list,
                    fps: {
                        start: str,
                        end: end,
                        key_word: groupname
                    },
                    url: this.$config.CONST_FETCH_REQUEST_URI
                }).then(res => {
                    if (res.data.back_value.length === 0) {
                        Notify({
                            message: '已无最新文章',
                            duration: 2000,
                        });
                    } else {
                        this.content_list = [...this.content_list, ...res.data.back_value];
                    }
                });

                this.show = false
            }
        },
        watch: {
            /**
             * 监听关键词的变化
             * */
            keyWord: {
                handler(val, oldVal) {
                    this.str = 0;
                    this.end = 30;
                    this.content_list = [];
                    this.refreshContent(this.str, this.end, val)
                }
            }

        }
    }
</script>

<style lang="less" scoped>
    .main-content {
        width: calc(100% - @default-menu-left-width);
        height: 100%;
        float: left;
        .default-box-sizing;
        .default-padding-20-40();
        overflow: scroll;

        .content-none-data {
            font-size: @default-font-size-40;
            color: @default-font-color-title;
            text-align: center;
        }

        .content {

            .content-item {
                border-bottom: 1px solid @default-app-color-divider;
                margin-bottom: 20px;
                padding-bottom: 20px;
                cursor: pointer;

                .content-item-title {
                    font-size: @default-font-size-40;
                    color: @default-font-color-content;
                }

                .content-item-date {
                    margin-bottom: 20px;
                }

                .content-item-details {
                    line-height: 1.6;
                }

                .content-item-date, .content-item-details {
                    font-size: @default-font-size-24;
                    color: @default-font-color-sub;
                }

                &:hover {
                    transition: all .3s;
                    background-color: @default-app-color-primary;
                    .default-padding-20-40();

                    .content-item-title, .content-item-date, .content-item-details {
                        color: #fff;
                    }
                }
            }

            .content-more {
                cursor: pointer;
                text-align: center;
                line-height: 4;
                color: @default-font-color-sub;
            }
        }
    }
</style>