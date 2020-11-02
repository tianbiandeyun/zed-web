<template>
    <section class="synthesisSelect">
        <p class="synthesisSelect-tip">长按保存你的万圣节专属头像</p>
        <ul class="synthesisSelect-background">
            <li>
                <div>
                    <img @click="selectIn(1)" src="../../assets/images/halloweenHeader1.png" alt="">
                </div>
                <p>万圣节头像框</p>
            </li>
            <li>
                <div>
                    <img @click="selectIn(2)" v-if="isShareRecord" src="../../assets/images/halloweenHeader2.png"
                         alt="">
                    <img v-else class="lock" @click="closeLock('share')"
                         src="../../assets/images/lock.png" alt="">
                </div>
                <p>专属城堡&女巫</p>
            </li>
            <li>
                <div>
                    <img @click="selectIn(3)" v-if="followRecord" src="../../assets/images/halloweenHeader3.png" alt="">
                    <img v-else class="lock" @click="closeLock()" src="../../assets/images/lock.png"
                         alt="">
                </div>
                <p>个性南瓜</p>
            </li>
        </ul>
    </section>
</template>

<script>
    // import {mapGetters} from 'vuex'

    export default {
        name: "synthesisSelect",
        props: {
            pOpenLockPublic: {
                type: Function
            },
            pOpenShareTip: {
                type: Function
            },
            isShareRecord: {
                type: Boolean,
                default: true
            },
            followRecord: {
                type: Boolean,
                default: true
            }
        },
        created() {

        },
        methods: {
            /**
             * 解锁公众号扫码
             * */
            closeLock(type) {
                let that = this;
                if (!that.isShareRecord) {
                    that.pOpenShareTip();
                    return
                }
                if (type === 'share') {
                    that.pOpenShareTip();
                } else {
                    that.pOpenLockPublic();
                }
            },
            selectIn(type) {
                let that = this;
                that.$showLoading();
                that.$emit('selectIn', type)
            }
        },
        computed: {
            // ...mapGetters([
            //     'isShareRecordInfo',
            //     'followRecordInfo'
            // ])
        }
    }
</script>

<style lang="less">
    .synthesisSelect {
        width: 100%;
        position: absolute;
        bottom: 120px;
        text-align: center;
        font-size: 24px;

        .synthesisSelect-tip {
            color: #fff;
            line-height: 2;
            font-size: 30px;
            margin-bottom: 20px;
        }

        .synthesisSelect-background {
            li {
                width: 180px;
                height: 220px;
                display: inline-block;

                div {
                    width: 100%;
                    height: 180px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 10px;
                    background-color: #fff;
                    -webkit-border-radius: 20px;
                    -moz-border-radius: 20px;
                    border-radius: 20px;
                    position: relative;

                    img {
                        width: 100%;
                    }

                    .lock {
                        position: absolute;
                        top: 4px;
                        left: 4px;
                        width: 95%;
                    }
                }

                &:nth-of-type(2) {
                    margin: 0px 30px;
                }

                p {
                    height: calc(100% - 200px);
                    line-height: 1.8;
                    color: #fff;
                }

            }
        }
    }
</style>