<template>
    <section class="result-container">

        <div class="result" id="result">

            <div class="result_content1">
                <span>{{user_info.back_value.nickname}}</span>
                <p>&</p>
                <span>{{sulo}}</span>
                <img class="zai" src="../assets/images/11.png" alt="">
            </div>

            <div class="result_content2">
                <span class="address">{{address}}</span>
                <p style="top: -4px;">一起</p>
                <p style="top: 4px;">祝</p>
                <p style="top: -4px;">福</p>
                <p style="top: 4px;">祖国</p>
            </div>

            <img class="result-bg" :src="result" alt="">
        </div>

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
                        }, 1000)
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

        .result {
            position: relative;
            font-weight: bold;

            p {
                display: inline-block;
            }

            div {
                color: #fff;
                font-size: 40px;

                span {
                    color: #F3D665;
                }
            }

            .result_content1 {
                position: absolute;
                top: 40px;
                left: 40px;

                p {
                    position: relative;
                    top: -10px;
                    margin: 0 10px;
                }

                span {
                    &:nth-of-type(2) {
                        display: inline-block;
                        -webkit-transform: rotate(10deg);
                        -moz-transform: rotate(10deg);
                        -ms-transform: rotate(10deg);
                        -o-transform: rotate(10deg);
                        transform: rotate(10deg);
                    }
                }

                .zai {
                    width: 60px;
                    position: absolute;
                    top: 10px;
                    right: -70px;
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                }
            }

            .result_content2 {
                position: absolute;
                top: 120px;
                left: 40px;

                p {
                    position: relative;
                    margin: 0 4px;
                }

                .address {
                    border-bottom: 2px solid #F3D665;;
                    padding-bottom: 8px;
                }
            }

            .result-bg {
                width: 100%;
            }
        }
    }
</style>