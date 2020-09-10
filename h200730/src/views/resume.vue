<template>
    <section class="resume-container">

        <div v-for="(item,index) in resume" :key="index">

            <div class="resume-title">
                <h2>{{item.title}}</h2>
            </div>

            <div class="resume" v-for="(key ,value) in item.content" :key="value">

                <div v-if="typeof key === 'object'" class="resume-exper">
                    <p v-for="(k ,v) in key" :key="v">
                        {{v}}：<span>{{k}}</span>
                    </p>
                </div>

                <div v-else class="resume-content">
                    {{value}}：<span>{{key}}</span>
                </div>

            </div>

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
                let work_list = [];

                for (let i = 0; i < result.work_history_list.length; i++) {
                    work_list.push({
                        '工作单位': result.work_history_list[i].work_unit,
                        '职位名称': result.work_history_list[i].name_of_post,
                        '就职日期': result.work_history_list[i].start_date,
                        '所属行业': result.work_history_list[i].industry,
                        '工作描述': result.work_history_list[i].describe
                    })
                }

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
                        'content': work_list
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
    .resume-container {
        padding: 10px 0;

        .resume-title {

            h2 {
                text-align: right;
                background-color: @default-app-color-primary;
                width: 200px;
                padding: 10px 10px 10px 0;
                color: #fff;
                font-size: @default-font-size-34;
                margin-bottom: 20px;
                margin-top: 20px;
            }
        }

        .resume {

            .resume-exper, .resume-content {
                line-height: 1.6;
                padding-left: 60px;
                font-size: @default-font-size-30;
                color: @default-font-color-content;

                span {
                    color: @default-font-color-sub;
                }
            }

            .resume-exper {
                border: 1px solid red;
                margin-bottom: 20px;
            }
        }
    }
</style>