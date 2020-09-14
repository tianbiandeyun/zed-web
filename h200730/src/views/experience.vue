<template>
    <section class="experience-container">
        <header class="header">添加工作经历（非必填）</header>

        <div class="experience-item">
            <Field
                    v-model="unit"
                    label="工作单位"
                    placeholder="请输入工作单位"/>
        </div>

        <div class="experience-item">
            <Field
                    v-model="post"
                    label="岗位名称"
                    placeholder="请输入岗位名称"/>
        </div>

        <div class="experience-item">
            <Field
                    v-model="industry"
                    label="所属行业"
                    placeholder="请输入所属行业"/>
        </div>

        <div class="experience-item">
            <Field
                    v-model="word"
                    rows="2"
                    autosize
                    label="工作描述"
                    type="textarea"
                    maxlength="100"
                    placeholder="工作描述"
                    show-word-limit/>
        </div>

        <div class="save-box">
            <button class="jump" @click="jump">跳过此信息</button>
            <button class="save" @click="save">{{button}}</button>
        </div>
    </section>
</template>

<script>
    import {Field} from 'vant';
    import {mapGetters} from 'vuex';

    export default {
        name: "experience",
        components: {Field},
        data() {
            return {
                button: '保存工作经历',
                unit: '',
                post: '',
                industry: '',
                word: '',
                resume_index: 0
            }
        },
        mounted() {
            let resume = this.resume_info.back_value.work_history_list;
            if (resume.length !== 0) {
                this.button = `下一项工作经历${this.resume_index}`;
                this.unit = resume[this.resume_index].work_unit;
                this.post = resume[this.resume_index].name_of_post;
                this.industry = resume[this.resume_index].industry;
                this.word = resume[this.resume_index].describe;
            }
        },
        methods: {
            jump() {
                this.$router.replace('/');
            },
            /**
             * 保存信息
             * */
            save() {
                const that = this;

                if (this.unit === '') {
                    this.$Toast('工作单位不能为空');
                    return false;
                }

                if (this.post === '') {
                    this.$Toast('岗位名称不能为空');
                    return false;
                }

                if (this.industry === '') {
                    this.$Toast('所属行业不能为空');
                    return false;
                }

                if (this.word === '') {
                    this.$Toast('工作描述不能为空');
                    return false;
                }

                let resume = this.resume_info.back_value.work_history_list;

                // 没填写过工作简历
                if (resume.length === 0) {

                    this.$Toast.loading({
                        message: '加载中...',
                        forbidClick: true,
                        duration: 0,
                        overlay: true
                    });

                    this.$store.dispatch('fetchData', {
                        im: this.$Config.PROJECT_INTERFACE.add_user_resume,
                        fps: {
                            open_id: this.openid_info.back_value.open_id,
                            work_unit: this.unit,
                            name_of_post: this.post,
                            industry: this.industry,
                            describe: this.word
                        },
                        url: this.$Config.REQUEST_URL
                    }).then(res => {
                        this.$Toast.clear();
                        if (res.back_value) {
                            this.$Alert.show({
                                title: '是否继续添加工作经历',
                                alertContent: '工作经历可以反复添加多次，如果您有其他工作经历请点击继续。',
                                yesText: '继续',
                                noText: '结束添加',
                                yes() {
                                    that.$router.go(0);
                                },
                                no() {
                                    that.$router.replace('/');
                                }
                            });
                        }
                    })
                }

                // 填写过工作经历
                if (resume.length !== 0) {

                    // 0 < 1 , 1 <= 1
                    if (this.resume_index <= resume.length - 1) {

                        // 修改
                        this.$store.dispatch('fetchData', {
                            im: this.$Config.PROJECT_INTERFACE.update_user_resume,
                            fps: {
                                open_id: this.openid_info.back_value.open_id,
                                work_id: '',
                                work_unit: this.unit,
                                name_of_post: this.post,
                                // start_date:'',
                                // end_date:'',
                                industry: this.industry,
                                describe: this.word
                            },
                            url: this.$Config.REQUEST_URL
                        }).then(res => {
                            if (res.back_value) {
                                this.resume_index += 1;
                                this.unit = resume[this.resume_index].work_unit;
                                this.post = resume[this.resume_index].name_of_post;
                                this.industry = resume[this.resume_index].industry;
                                this.word = resume[this.resume_index].describe;
                                this.button = this.resume_index === resume.length - 1 ? '保存工作经历' : '下一项工作经历'
                            }
                        })

                    }

                }

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
    .experience-container {

        height: 100%;
        background-color: @default-app-color-background;

        .header {
            font-size: @default-font-size-34;
            color: @default-app-color-primary;
            padding: 40px 20px 20px 20px;
            background-color: #fff;
            margin-bottom: 20px;
        }

        .experience-item {
            padding: 10px;
            background-color: #fff;
        }

        .save-box {
            width: 100%;
            position: fixed;
            bottom: 80px;
            text-align: center;

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