<template>
    <section class="result-container">
        <img :src="img_src" alt="">
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "result",
        data(){
            return {
                img_src:''
            }
        },
        mounted(){
            this.$utils.setDocumentTitle('答题结果');

            this.$store.dispatch('_getQuestionResult', {
                im: this.$config.PROJECT_INTERFACE.get_answer_record,
                fps: {
                    open_id: this.getOpenid_info.back_value.open_id,
                },
                url: this.$config.REQUEST_URL
            }).then(res => {

                let _result = +res.back_value;

                if(_result <= 2){
                    this.img_src = require('../assets/images/1.png')
                    return false;
                }

                if(2 < _result && _result <= 16){
                    this.img_src = require('../assets/images/2.png')
                    return false;
                }

                if(16 < _result && _result <= 23){
                    this.img_src = require('../assets/images/3.png')
                    return false;
                }

            })

        },
        computed: {
            ...mapGetters([
                'getOpenid_info'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .result-container{
        img{
            width:100%;
        }
    }
</style>