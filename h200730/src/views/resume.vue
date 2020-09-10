<template>
    <section class="resume-container">

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "resume",
        mounted() {

            let _resume = {
                'contact': {
                    name: this.resume_info.back_value.name,
                    sex: this.resume_info.back_value.sex,
                    mail: this.resume_info.back_value.mail,
                    phone: this.resume_info.back_value.phone
                },
                'age': {
                    native_place: this.resume_info.back_value.native_place,
                    address: this.resume_info.back_value.address,
                    date_of_birth: this.resume_info.back_value.date_of_birth,
                    graduate_institutions: this.resume_info.back_value.graduate_institutions,
                    specialty: this.resume_info.back_value.specialty,
                    education_level: this.resume_info.back_value.education_level
                },
                'office': {
                    political_status: this.resume_info.back_value.political_status,
                    expected_position: this.resume_info.back_value.expected_position,
                    self_introduction: this.resume_info.back_value.self_introduction,
                    qualification_certificate: this.resume_info.back_value.qualification_certificate
                },
                'exper': this.resume_info.back_value.work_history_list
            };

            console.log(_resume);

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