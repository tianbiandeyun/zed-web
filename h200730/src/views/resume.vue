<template>
    <section class="resume-container">
        <div v-for="(item,index) in resume" :key="index">
            <p>{{item.title}}</p>
            {{item.content.name}}
            {{item.content.sex}}
            {{item.content.mail}}
            {{item.content.phone}}
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "resume",
        data() {
            return {
                resume: {}
            }
        },
        mounted() {
            this.resume = this._setResume();
        },
        methods: {
            _setResume() {
                let result = this.resume_info.back_value;
                return [
                    {
                        'title': '联系方式',
                        'content': {
                            name: result.name,
                            sex: result.sex,
                            mail: result.mail,
                            phone: result.phone
                        }
                    },
                    {
                        'title': '年龄及专业',
                        'content': {
                            native_place: result.native_place,
                            address: result.address,
                            date_of_birth: result.date_of_birth,
                            graduate_institutions: result.graduate_institutions,
                            specialty: result.specialty,
                            education_level: result.education_level
                        }
                    },
                    {
                        'title': '岗位相关',
                        'content': {
                            political_status: result.political_status,
                            expected_position: result.expected_position,
                            self_introduction: result.self_introduction,
                            qualification_certificate: result.qualification_certificate
                        }
                    },
                    {
                        'title': '工作经历',
                        'content': result.work_history_list
                    }
                ];
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