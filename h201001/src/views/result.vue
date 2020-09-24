<template>
    <section class="result-container" id="result">
        <div class="address">
            <p>{{user_info.back_value.nickname}} 和 {{sulo}}</p>
            <p>在{{address}}一起祝福祖国</p>
        </div>
        <img class="result-bg" :src="result" alt="">
    </section>
</template>

<script>
    import html2canvas from '../utils/html2canvas'
    import {mapGetters} from 'vuex'

    export default {
        name: "result",
        data() {
            return {
                result_images: {
                    'ce': {
                        img: require('../assets/images/r_ce.png'),
                        name: '嫦娥'
                    },
                    'wg': {
                        img: require('../assets/images/r_wg.png'),
                        name: '吴刚'
                    },
                    'yl': {
                        img: require('../assets/images/r_yl.png'),
                        name: '月老'
                    },
                    'yt': {
                        img: require('../assets/images/r_yt.png'),
                        name: '玉兔'
                    }
                },
                result: '',
                sulo: '',
                address: ''
            }
        },
        mounted() {
            this.$Toast.loading({
                message: '生成中...',
                forbidClick: true,
                duration: 0
            });
            this.init().then(res => {
                if (res) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            window.pageYOffset = 0;
                            document.documentElement.scrollTop = 0;
                            document.body.scrollTop = 0;
                            (window.html2canvas || html2canvas)(
                                document.querySelector("#result"), {
                                    allowTaint: true,
                                    useCORS: true
                                }).then(canvas => {
                                this.result = '';
                                this.result = canvas.toDataURL("image/png");
                                this.$Toast.clear();
                            });
                        }, 500)
                    });
                }
            })
        },
        methods: {
            init() {

                return new Promise((resolve, reject) => {
                    let sulo = this.$route.query.sulo;
                    let address = this.$route.query.address;

                    this.result = this.result_images[sulo].img;
                    this.address = address;
                    this.sulo = this.result_images[sulo].name;

                    resolve(true);
                });

            }
        },
        computed: {
            ...mapGetters([
                'user_info'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .result-container {
        height: 100%;
        position: relative;

        .address {
            position: absolute;
            top: 80px;
            left: 40px;
            z-index: 1;
            font-size: 40px;
            color: #fff;
            line-height: 1.4;
        }

        .result-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            /*height: 100%;*/
        }
    }
</style>