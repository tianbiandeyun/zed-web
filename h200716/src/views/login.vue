<template>
    <div class="login-container">

        <div class="login-qrimg">
            <wxlogin :appid="appid" :scope="scope" :redirect_uri="_toEncode(redirect_uri)"></wxlogin>
        </div>

    </div>
</template>

<script>
    import wxlogin from 'vue-wxlogin';

    export default {
        name: 'login',
        components: {wxlogin},
        data() {
            return {
                appid: 'wx796d47462dfabc5c',
                scope: 'snsapi_login',
                redirect_uri: 'http://hztc.dev.hztcapp.com/index.php?r=interface/web_wx&iden=h200716'
            }
        },
        methods: {
            _toEncode(inputstr) {
                return encodeURIComponent(inputstr).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
            },
        }
    }
</script>

<style lang="less" scoped>

    .login-qrimg {
        text-align: center;
    }

</style>
