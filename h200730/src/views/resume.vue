<template>
    <section class="resume-container">

        <div v-for="(item,index) in resume" :key="index">

            <h2>{{item.title}}</h2>

            <p v-for="(key ,value) in item.content" :key="value">
                {{value}}：{{key}}
            </p>

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
                            '姓名': result.name,
                            '性别': +result.sex === 1 ? '男' : '女',
                            '电子邮件': result.mail,
                            '联系电话': result.phone
                        }
                    },
                    {
                        'title': '年龄及专业',
                        'content': {
                            '籍贯': result.native_place + result.address,
                            '出生日期': result.date_of_birth,
                            '毕业院校': result.graduate_institutions,
                            '所属专业': result.specialty,
                            '学历': result.education_level
                        }
                    },
                    {
                        'title': '岗位相关',
                        'content': {
                            '政治面貌': result.political_status,
                            '期望岗位': result.expected_position,
                            '自我介绍': result.self_introduction,
                            '岗位证书': result.qualification_certificate
                        }
                    },
                    {
                        'title': '工作经历',
                        // 'content': result.work_history_list
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