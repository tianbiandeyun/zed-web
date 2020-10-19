<template>
    <section class="resume-container">

        <div v-for="(item,index) in resume" :key="index">

            <div class="resume-title">
                <h2>{{item.title}}</h2>
            </div>

            <div class="resume" v-for="(key ,value) in item.content" :key="value">

                <div v-if="typeof key === 'object'" class="resume-exper">
                    <p v-for="(k ,v) in key" :key="v" v-if="v !== 'id'">
                        {{v}}：<span>{{k}}</span>
                    </p>
                    <img class="resume-del" @click="del(key.id)" src="../assets/images/del.png" alt="">
                </div>

                <div v-else class="resume-content">
                    {{value}}：<span>{{key}}</span>
                </div>

            </div>

        </div>

        <div class="save-box">
            <!--<button class="jump">下载WORD</button>-->
            <button class="save" @click="modify">修改简历</button>
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
        async mounted() {
            this.$Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
                overlay: true
            });
            this.resume = await this._setResume();
            this.$Toast.clear();
        },
        methods: {
            modify() {
                this.$router.replace('/basic')
            },
            del(id) {

                this.$Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0,
                    overlay: true
                });

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.del_work_history,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        work_history_id: id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    if (res.back_value) {
                        this.$store.dispatch('getSelfResume', {
                            im: this.$Config.PROJECT_INTERFACE.get_user_resume,
                            fps: {
                                open_id: this.openid_info.back_value.open_id
                            },
                            url: this.$Config.REQUEST_URL
                        }).then(async res => {
                            this.resume = await this._setResume();
                            this.$Toast.clear();
                        })
                    }
                });

            },
            _setResume() {
                let result = this.resume_info.back_value;
                let work_list = [];
                console.log(result);

                if (result.work_history_list.length !== 0) {
                    for (let i = 0; i < result.work_history_list.length; i++) {
                        work_list.push({
                            id: result.work_history_list[i].id,
                            '公司名称': result.work_history_list[i].work_unit,
                            '职位类型': result.work_history_list[i].name_of_post,
                            '就职日期': `${result.work_history_list[i].start_date} - ${result.work_history_list[i].end_date}`,
                            '工作描述': result.work_history_list[i].describe
                        })
                    }
                }

                return [
                    {
                        'title': '联系方式',
                        'content': {
                            '姓名': result.name || '没有填写',
                            '性别': +result.sex === 1 ? '男' : '女',
                            '现居地址': result.native_place,
                            '出生日期': result.date_of_birth,
                            '电子邮件': result.mail || '没有填写',
                            '联系电话': result.phone || '没有填写'
                        }
                    },
                    {
                        'title': '年龄及专业',
                        'content': {
                            '毕业院校': result.graduate_institutions || '没有填写',
                            '政治面貌': result.political_status || '没有填写',
                            '毕业年份': result.graduation_year || '没有填写',
                            '专业': result.specialty || '没有填写',
                            '学历': result.education_level || '没有填写'
                        }
                    },
                    {
                        'title': '自我介绍',
                        'content': {
                            '自我介绍': result.self_introduction || '没有填写'
                        }
                    },
                    {
                        'title': '个人经历',
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
                border-bottom: 2px solid @default-app-color-divider;
                margin-bottom: 20px;
                position: relative;
                padding-bottom: 10px;

                .resume-del {
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    top: 0;
                    right: 60px;
                }
            }
        }

        .save-box {
            width: 100%;
            text-align: center;
            margin-bottom: 40px;

            .jump {
                font-size: @default-font-size-30;
                border: 4px solid @default-font-color-sub;
                color: @default-font-color-sub;
                padding: 16px 40px;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
                margin-right: 20px;
            }

            .save {
                font-size: @default-font-size-30;
                background-color: @default-app-color-primary;
                color: #fff;
                padding: 20px 40px;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
            }
        }
    }
</style>