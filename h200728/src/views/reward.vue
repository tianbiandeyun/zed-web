<template>
    <section class="reward-container">

        <!--<div class="reward_item" v-for="(item,index) in reward_list" :key="index">-->
            <!--<div class="reward_item___left">-->
                <!--<img src="../assets/images/t.png" alt="">-->
            <!--</div>-->
            <!--<div class="reward_item___center">-->
                <!--<p>连续签到{{reward_type[item.bonustype].day}}天，获得{{reward_type[item.bonustype].reward}}青创币</p>-->
                <!--<p>有效期至{{item.expiration_time}}</p>-->
            <!--</div>-->
            <!--<div class="reward_item___right">-->
                <!--<button>不能领取</button>-->
            <!--</div>-->
        <!--</div>-->

        <div class="reward_item">
            <div class="reward_item___left">
                <img src="../assets/images/t.png" alt="">
            </div>
        </div>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "reward",
        data() {
            return {
                reward_list: [],
                reward_type: this.$Config.REWARD_TYPE
            }
        },
        mounted() {

            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.getbonuslist,
                fps: {
                    open_id: this.openid_info.back_value.open_id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.reward_list = res.back_value;
            })

        },
        computed: {
            ...mapGetters([
                'openid_info'
            ])
        }
    }
</script>

<style lang="less" scoped>

    .reward-container {
        overflow-y: scroll;
        height: 100%;
        background-color: @default-app-color-background;
        padding: 20px 10px;

        .reward_item {
            display: grid;
            grid-template-columns: 1fr 5fr 2fr;
            background-color: #fff;
            padding: 20px 10px;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;
            margin-bottom: 20px;

            .reward_item___left {
                display: grid;
                align-items: center;
                justify-items: center;

                img {
                    width: 70px;
                }
            }

            .reward_item___center {
                display: grid;
                align-items: center;

                p {
                    font-size: @default-font-size-26;
                    padding-left: 10px;
                    color: @default-font-color-content;
                }
            }

            .reward_item___right {
                display: grid;
                align-items: center;

                button {
                    color: #FFF;
                    font-size: @default-font-size-26;
                    background-color: @default-app-color-primary;
                    padding: 16px 20px 16px 20px;
                    -webkit-border-radius: @default-element-border-radius;
                    -moz-border-radius: @default-element-border-radius;
                    border-radius: @default-element-border-radius;
                }
            }
        }
    }

</style>