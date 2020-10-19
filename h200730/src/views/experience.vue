<template>
    <section class="experience-container">
        <header class="header">个人经历</header>

        <div class="experience-item">
            <Field
                    v-model="unit"
                    label="公司名称"
                    placeholder="请输入公司名称"/>
        </div>

        <div class="experience-item">
            <Field
                    v-model="post"
                    label="职位类型"
                    placeholder="请输入职位类型"/>
        </div>

        <div class="experience-item">
            <Field
                    readonly
                    clickable
                    name="picker"
                    :value="work_start"
                    label="就职开始时间"
                    placeholder="点击选择就职开始时间"
                    @click="work_start_picker = true"/>

            <Popup v-model="work_start_picker" position="bottom">
                <Picker
                        show-toolbar
                        :columns="work_start_columns"
                        @confirm="getWorkStart"
                        @cancel="work_start_picker = false"/>
            </Popup>
        </div>

        <div class="experience-item">
            <Field
                    readonly
                    clickable
                    name="picker"
                    :value="work_end"
                    label="就职结束时间"
                    placeholder="点击选择就职结束时间"
                    @click="work_end_picker = true"/>

            <Popup v-model="work_end_picker" position="bottom">
                <Picker
                        show-toolbar
                        :columns="work_end_columns"
                        @confirm="getWorkEnd"
                        @cancel="work_end_picker = false"/>
            </Popup>
        </div>

        <div class="experience-item">
            <Field
                    v-model="word"
                    rows="2"
                    autosize
                    label="工作描述"
                    type="textarea"
                    maxlength="150"
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
    import {Field, Popup, Picker} from 'vant';
    import {mapGetters} from 'vuex';

    export default {
        name: "experience",
        components: {Field, Popup, Picker},
        data() {
            return {
                button: '保存个人经历',
                resume_index: 0,
                unit: '', // 公司名称
                post: '', // 职位类型
                word: '', // 工作描述
                work_start: '',
                work_start_picker: false,
                work_start_columns: [
                    {
                        values: this.year(),
                        defaultIndex: 0,
                    },
                    {
                        values: this.month(),
                        defaultIndex: 0,
                    },
                    {
                        values: this.day(),
                        defaultIndex: 0,
                    }
                ],
                work_end: '',
                work_end_picker: false,
                work_end_columns: [
                    {
                        values: this.year(),
                        defaultIndex: 0,
                    },
                    {
                        values: this.month(),
                        defaultIndex: 0,
                    },
                    {
                        values: this.day(),
                        defaultIndex: 0,
                    }
                ],
            }
        },
        mounted() {
            // if (this.resume_info.back_value.length !== 0) {
            //     let resume = this.resume_info.back_value.work_history_list;
            //     this.button = resume.length === 1 ? `保存工作经历` : `下一项工作经历`;
            //     this.unit = resume[this.resume_index].work_unit;
            //     this.post = resume[this.resume_index].name_of_post;
            //     this.industry = resume[this.resume_index].industry;
            //     this.word = resume[this.resume_index].describe;
            // }
        },
        methods: {
            getWorkEnd(res) {
                this.work_end = `${res[0]}-${res[1]}-${res[2]}`;
                this.work_end_picker = false;
            },
            getWorkStart(res) {
                this.work_start = `${res[0]}-${res[1]}-${res[2]}`;
                this.work_start_picker = false;
            },
            jump() {
                this.$router.replace('/');
            },
            /**
             * 保存信息
             * */
            save() {
                const that = this;

                if (this.unit === '') {
                    this.$Toast('公司名称不能为空');
                    return false;
                }

                if (this.post === '') {
                    this.$Toast('职位类型不能为空');
                    return false;
                }

                if (this.work_start === '') {
                    this.$Toast('就职开始时间不能为空');
                    return false;
                }

                if (this.work_end === '') {
                    this.$Toast('就职结束时间不能为空');
                    return false;
                }

                if (this.word === '') {
                    this.$Toast('工作描述不能为空');
                    return false;
                }

                // 没填写过工作简历
                if (this.resume_info.back_value.length === 0) {

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
                            start_date: this.work_start,
                            end_date: this.work_end,
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
                                    that.unit = '';
                                    that.post = '';
                                    that.work_start = '';
                                    that.work_end = '';
                                    that.word = '';
                                },
                                no() {
                                    that.$router.replace('/');
                                }
                            });
                        }
                    });

                    return false;
                }

                // 填写过工作经历
                // if (this.resume_info.back_value.length !== 0) {
                //
                //     let resume = this.resume_info.back_value.work_history_list;
                //
                //     // 0 < 1 , 1 <= 1
                //     if (this.resume_index <= resume.length - 1) {
                //
                //         // 修改
                //         this.$store.dispatch('fetchData', {
                //             im: this.$Config.PROJECT_INTERFACE.update_user_resume,
                //             fps: {
                //                 open_id: this.openid_info.back_value.open_id,
                //                 user_resume_id: this.resume_info.back_value.id,
                //                 work_id: resume[this.resume_index].id,
                //                 work_unit: this.unit,
                //                 name_of_post: this.post,
                //                 // start_date:'',
                //                 // end_date:'',
                //                 industry: this.industry,
                //                 describe: this.word
                //             },
                //             url: this.$Config.REQUEST_URL
                //         }).then(res => {
                //             if (res.back_value) {
                //                 this.resume_index += 1;
                //                 if (this.resume_index <= resume.length - 1) {
                //                     this.unit = resume[this.resume_index].work_unit;
                //                     this.post = resume[this.resume_index].name_of_post;
                //                     this.industry = resume[this.resume_index].industry;
                //                     this.word = resume[this.resume_index].describe;
                //                     this.button = this.resume_index === resume.length - 1 ? '保存工作经历' : '下一项工作经历';
                //                 } else {
                //                     this.$router.replace('/');
                //                 }
                //             }
                //         })
                //
                //     }
                //
                //     return false;
                // }

            },
            year() {
                let a = [];
                for (let i = 2010; i < 2021; i++) {
                    a.push(i)
                }
                return a;
            },
            month() {
                let a = [];
                for (let i = 1; i < 13; i++) {
                    a.push(i < 10 ? `0${i}` : i)
                }
                return a;
            },
            day() {
                let a = [];
                for (let i = 1; i < 32; i++) {
                    a.push(i < 10 ? `0${i}` : i)
                }
                return a;
            },
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