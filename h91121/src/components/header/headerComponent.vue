<template>
    <section class="headerComponent">
        <div class="header-userInfo">
            超级管理：{{getUserInfoInfo.nickname}}
            <div class="header-out animated fadeInDown" @click="out">
                退出
            </div>
        </div>
    </section>
</template>

<script>
    import * as config from '../../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "headerComponent",
        data() {
            return {}
        },
        async created() {
            const that = this;
            /**
             * 获取用户信息
             * */
            await that.$store.dispatch('_getUserInfo', {
                im: config.requestInterface.getUserInfo,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });
            console.log(that.getUserInfoInfo.error_code);
            /**
             * 如果没有登陆返回 login
             * 开发的时候 注释掉 上线的时候 放开
             * */
            if (that.getUserInfoInfo.error_code === 1911271848) {
                that.$router.replace({name: 'login'});
            }
        },
        methods: {
            /**
             * 退出登陆
             * */
            out() {
                const that = this;
                that.$store.dispatch('_setSignOut', {
                    im: config.requestInterface.setSignOut,
                    fps: {},
                    url: config.CONST_FETCH_REQUEST_URI
                }).then(res => {
                    if (res.back_value) {
                        that.$router.replace({name: 'login'});
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
                'getUserInfoInfo'
            ])
        }
    }
</script>

<style lang="less">
    .headerComponent {
        background-color: #2d8cf0;
        height: 80px;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        .header-userInfo {
            width: 300px;
            height: 80px;
            float: right;
            text-align: center;
            line-height: 80px;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            position: relative;

            .header-out {
                width: 300px;
                height: 80px;
                background-color: #2d8cf0;
                position: absolute;
                z-index: 9;
                display: none;
                text-align: center;
                line-height: 80px;
                color: #fff;
                font-size: 20px;
            }
            &:hover .header-out {
                display: block;
            }
        }
    }
</style>