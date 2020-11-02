<template>
    <section class="login">
        <div class="login-qrimg">
            <wxlogin :appid="appid" :scope="scope" :redirect_uri="_toEncode(redirect_uri)"></wxlogin>
        </div>
    </section>
</template>

<script>
    import wxlogin from 'vue-wxlogin';

    export default {
        name: "login",
        components: {wxlogin},
        data() {
            return {
                appid: 'wx796d47462dfabc5c',
                scope: 'snsapi_login',
                redirect_uri: 'https://hztc.dev.hztcapp.com/index.php?r=interface/web_wx'
            }
        },
        methods: {
            _toEncode(inputstr) {
                return encodeURIComponent(inputstr).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
            },
        },
        created() {
            // const that = this;
        }
    }
</script>

<style lang="less">
    .login {
        height: 100%;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        .login-qrimg {
            height: 100%;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding-top: 100px;
            div {
                height: 100%;
                iframe {
                    display: block;
                    margin: 0 auto;
                }
            }
        }
    }
</style>