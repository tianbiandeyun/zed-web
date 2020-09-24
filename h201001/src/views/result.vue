<template>
    <section class="result-container" id="result">
        <img class="result-bg" :src="result" alt="">
    </section>
</template>

<script>
    import html2canvas from '../utils/html2canvas'

    export default {
        name: "result",
        data() {
            return {
                result_images: {
                    'ce': require('../assets/images/r_ce.png'),
                    'wg': require('../assets/images/r_wg.png'),
                    'yl': require('../assets/images/r_yl.png'),
                    'yt': require('../assets/images/r_yt.png')
                },
                result: ''
            }
        },
        mounted() {
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
                                console.log(canvas.toDataURL("image/png"));
                            });
                        }, 500)
                    });
                }
            })
        },
        methods: {
            init() {

                return new Promise((resolve, reject) => {
                    let nickname = 'jack';
                    let sulo = this.$route.query.sulo;
                    let value = this.$route.query.value;


                    this.result = this.result_images[sulo];
                    // console.log(nickname)
                    // console.log(this.result_images[sulo]);
                    // console.log(value)

                    resolve(true);
                });

            }
        }
    }
</script>

<style lang="less" scoped>
    .result-container {
        height: 100%;
        border: 1px solid black;
        position: relative;

        .result-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>