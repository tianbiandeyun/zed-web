<template>
    <section class="resume-container">

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "resume",
        mounted() {

            console.log(this.resume_info.back_value);

            let _resume = {
                '联系方式': {
                    name: '',
                    sex: '',
                    mail: '',
                    phone: ''
                },
                '年龄及专业': {
                    native_place: '',
                    address: '',
                    date_of_birth: '',
                    graduate_institutions: '',
                    specialty: '',
                    education_level: ''
                },
                '岗位相关': {
                    political_status: '',
                    expected_position: '',
                    self_introduction: '',
                    qualification_certificate: ''
                },
                '工作经历': []
            }

        },
        computed: {
            ...mapGetters([
                'openid_info',
                'resume_info'
            ])
        }
    }
</script>

<style lang="less" scoped>

</style>